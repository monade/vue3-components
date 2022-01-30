<template>
  <div class="comparison-group-editor" :class="{ 'content-disabled': loading }">
    <div class="comparison-group-editor__left">
      <div class="comparison-group-editor__item">
        <template v-if="isCreating">
          <input type="text" ref="name" class="form-control" v-model="current.name" placeholder="Nome gruppo..." v-on:keyup.enter="create" v-on:keyup.esc="stopCreating">
        </template>
        <template v-else>
          <button class="btn btn-link btn-with-icon" @click.stop="startCreating">
            <v-icon>plus-circle</v-icon>Crea nuovo gruppo
          </button>
        </template>
      </div>
      <div class="comparison-group-editor__list" ref="list">
        <div class="comparison-group-editor__item"
          :ref="`item-${group.id}`"
          :class="{'comparison-group-editor__item--selected': group == selected}"
          @click.stop="select(group)"
          v-for="group of groups" :key="group.id">
          {{ group.name }} ({{ group.elementsCount }})
        </div>
      </div>
    </div>
    <div class="comparison-group-editor__right">
      <div class="comparison-group-editor__elements" :class="{'editing': this.isEditing}" v-if="isSelected">
        <template v-if="isEditing">
          <div class="comparison-group-editor__elements__search">
            <entry-search ref="search" @searched="onSearch" />
          </div>
          <div class="py-2">
            <button class="btn btn-link btn-with-icon" @click.stop="stopEditing">
              <v-icon>chevron-left</v-icon>Torna al gruppo
            </button>
          </div>
          <div class="comparison-group-editor__elements__body">
            <div class="comparison-group-editor__elements__list" v-if="searchResult.total">
              <entry-list-group
                :items="{
                  companies: searchResult.companies,
                  brands: searchResult.brands,
                  products: searchResult.products
                }"
                :can-add="canAdd"
                @add="addEntry"
                @remove="removeEntry" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="comparison-group-editor__elements__body">
            <template v-if="selected.isEmpty()">
              <small>Non hai ancora elementi in questo gruppo.</small>
            </template>
            <template v-else>
              <entry-list-group
                :items="{
                  companies: selected.companies,
                  brands: selected.brands,
                  products: selected.products
                }"
                @remove="removeEntry" />
            </template>
          </div>
          <div class="comparison-group-editor__elements__footer">
            <button class="btn btn-link btn-with-icon" @click.stop="startEditing" :disabled="!canAddElements">
              <v-icon>plus-circle</v-icon>Aggiungi elementi
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Entry from '../models/Entry';
import EntryGroupItem from '../models/EntryGroupItem';
import VEntrySearch, { VEntrySearchResult } from './VEntrySearch.vue';
import VEntryList from './VEntryList.vue';
import VEntryListGroup from './VEntryListGroup.vue';
import VIcon from './VIcon.vue';

const STATUS_DEFAULT = 'default';
const STATUS_CREATE = 'create';
const STATUS_EDIT = 'edit';

const MAX_ELEMENTS_COUNT = 10;

@Component({
  components: {
    VEntrySearch,
    VEntryList,
    VEntryListGroup,
    VIcon
  }
})
export default class ComparisonGroupEditor extends Vue {
  @Prop({ default: null }) readonly payload? : any;
  @Prop({ default: MAX_ELEMENTS_COUNT }) readonly maxElements? : number;
  @Prop({ default: () => { return Promise.resolve([]); } }) readonly loadGroups!: (payload: any|null) => Promise<EntryGroupItem[]>;
  @Prop({ default: () => { return Promise.resolve({}); } }) readonly createGroup!: (group: EntryGroupItem) => Promise<EntryGroupItem>;
  @Prop({ default: (entry: Entry, group: EntryGroupItem) => { return Promise.resolve(); } }) readonly addEntryToGroup!: (entry: Entry, group: EntryGroupItem) => Promise<void>;
  @Prop({ default: (entry: Entry, group: EntryGroupItem) => { return Promise.resolve(); } }) readonly removeEntryFromGroup!: (entry: Entry, group: EntryGroupItem) => Promise<void>;

  status: string = STATUS_DEFAULT;
  loading = false;
  current: EntryGroupItem = { id: '', title: '', entries: [] };

  selected: EntryGroupItem|null = null;

  groups: EntryGroupItem[] = [];

  searchResult: VEntrySearchResult = {
    items: [],
    total: 0
  };

  get isCreating(): boolean {
    return this.status === STATUS_CREATE;
  }

  get isEditing(): boolean {
    return this.status === STATUS_EDIT;
  }

  get isSelected(): boolean {
    return this.selected !== null;
  }

  get canAddElements(): boolean {
    if (!this.selected) {
      return false;
    } else {
      if (!this.selected.entries) {
        return false;
      } else {
        return this.selected.entries.length < (this.maxElements || MAX_ELEMENTS_COUNT);
      }
    }
  }

  created() {
    this.load();
  }

  startCreating() {
    this.status = STATUS_CREATE;

    this.$nextTick(() => {
      (this.$refs.name as HTMLInputElement).focus();
    });
  }

  stopCreating() {
    this.status = STATUS_DEFAULT;
    this.current = { id: '', title: '', entries: [] };
  }

  startEditing() {
    this.status = STATUS_EDIT;

    this.$nextTick(() => {
      (this.$refs.search as VEntrySearch).focus();
    });
  }

  stopEditing() {
    this.status = STATUS_DEFAULT;
    this.clearSearchResult();
  }

  select(group: EntryGroupItem) {
    this.status = STATUS_DEFAULT;
    this.selected = group;

    this.emitSelected();
  }

  public selectFirst() {
    if (this.groups.length) {
      this.selected = this.groups[0];
      this.emitSelected();
    }
  }

  public selectById(id: string) {
    const group = this.groups.find((group: EntryGroupItem) => group.id === id);
    if (group) {
      this.select(group);
    }
  }

  protected async load() {
    this.loading = true;
    this.groups = await this.loadGroups(this.payload);
    this.sortGroups();
    this.loading = false;
    this.$emit('ready', true);
  }

  protected async create() {
    if (!this.current.title) {
      return;
    }

    const group = await this.createGroup(this.current);

    this.groups.push(group);
    this.sortGroups();

    this.stopCreating();

    this.selected = group;
    this.$nextTick(() => {
      this.scrollToSelected();
    })

    this.emitSelected();
  }

  protected canAdd(value: Entry): boolean {
    if (!this.selected) {
      return false;
    }
    return this.groupHasEntry(this.selected, value) === false;
  }

  protected async addEntry(value: Entry) {
    if (!this.selected) {
      return;
    }
    this.groupAddEntry(this.selected, value);

    try {
      this.loading = true;
      await this.addEntryToGroup(value, this.selected);
      this.loading = false;
      this.emitSelected();
    } catch (e) {
      this.groupRemoveEntry(this.selected, value);
    }
  }

  protected async removeEntry(value: Entry) {
    if (!this.selected) {
      return;
    }

    this.groupRemoveEntry(this.selected, value);

    try {
      this.loading = true;
      await this.removeEntryFromGroup(value, this.selected);
      this.loading = false;
      this.emitSelected();
    } catch (e) {
      this.groupAddEntry(this.selected, value);
    }
  }

  protected scrollToSelected() {
    if (this.selected === null) {
      return;
    }

    const container = this.$refs.list as HTMLElement;
    const selected = this.$refs[`item-${this.selected.id}`] as Element[];

    if (selected.length === 0) {
      return;
    }

    const element = selected[0] as HTMLElement;
    if (element.offsetTop > container.clientHeight) {
      container.scrollTop = (element.offsetTop + element.clientHeight) - container.clientHeight;
    } else if (element.offsetTop < container.scrollTop) {
      container.scrollTop = element.offsetTop;
    }
  }

  protected sortGroups() {
    this.groups.sort((first: EntryGroupItem, second: EntryGroupItem): number => {
      if (first.title.toUpperCase() < second.title.toUpperCase()) {
        return -1;
      } else if (first.title.toUpperCase() > second.title.toUpperCase()) {
        return 1;
      }

      return 0;
    });
  }

  protected clearSearchResult() {
    this.searchResult.items = [];
    this.searchResult.total = 0;
  }

  protected emitSelected() {
    this.$emit('selected', this.selected);
  }

  protected onSearch(results: VEntrySearchResult) {
    this.searchResult = results;
  }

  private groupHasEntry(group: EntryGroupItem, entry: Entry) {
    if (group.entries) {
      return group.entries.indexOf(entry) > -1;
    }
    return false;
  }

  private groupAddEntry(group: EntryGroupItem, entry: Entry) {
    if (group.entries) {
      group.entries.push(entry);
    } else {
      group.entries = [entry];
    }
  }

  private groupRemoveEntry(group: EntryGroupItem, entry: Entry) {
    if (group.entries) {
      const idx = group.entries.indexOf(entry);
      group.entries = group.entries.splice(idx, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';

  .comparison-group-editor {
    $editor-left-width: 200px;
    $editor-item-height: 34px;
    $editor-elements-padding: 12px;

    position: relative;
    height: 100%;
    font-size: $font-size-sm;

    &__left {
      width: $editor-left-width;
      height: 100%;

      position: absolute;
      border-right: 1px solid $border-color;
    }

    &__right {
      height: 100%;

      left: $editor-left-width;
      right: 0;
      position: absolute;
    }

    &__list {
      position: absolute;
      top: 34px;
      bottom: 0;
      width: 100%;
      overflow-y: auto;

      .comparison-group-editor__item {
        cursor: pointer;

        &:hover {
          background-color: $gray-200;
        }
      }
    }

    &__item {
      height: $editor-item-height;
      border-bottom: 1px solid $border-color;
      padding: 8px 15px;
      letter-spacing: -0.15px;

      > input {
        border: none;
        padding: 0;
        height: 1rem;
        border-radius: 0;

        &::placeholder {
          font-style: italic;
        }
      }

      &--selected {
        background-color: $gray-300;
      }
    }

    &__elements {
      padding: $editor-elements-padding;
      height: 100%;

      &__header {
        font-weight: $font-weight-medium;
        font-size: $font-size-xs;
        color: $secondary;

        &--empty {
          font-weight: $font-weight-normal;
          color: $dark;
        }
      }

      &__search {
        margin-top: -$editor-elements-padding;
        margin-left: -$editor-elements-padding;
        margin-right: -$editor-elements-padding;
        margin-bottom: 0;
        height: $editor-item-height;
        border-bottom: 1px solid $border-color;
        padding: 8px 15px;
      }

      &__body {
        position: absolute;

        top: $editor-elements-padding;
        bottom: 30px;
        left: $editor-elements-padding;
        right: $editor-elements-padding;

        overflow-y: auto;
      }

      &__footer {
        position: absolute;
        width: 100%;
        bottom: $editor-elements-padding;
      }

      &.editing {
        .comparison-group-editor__elements__body {
          top: 68px;
          bottom: 0;
        }
      }
    }
  }
</style>

<style lang="scss">
  @import '../css/vue';

  .comparison-group-editor {
    input {
      border: none;
      padding: 0;
      height: 1rem;
      border-radius: 0;
      caret-color: $primary;

      &::placeholder {
        font-style: italic;
        padding-left: 3px;
      }
    }

    .entry-search {
      .icon {
        right: 0;
      }
    }
  }
</style>
