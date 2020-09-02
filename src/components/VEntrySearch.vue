<template>
  <div class="entry-search" :class="`entry-search--${iconAlign}`" v-click-outside="closeDropdown">
    <input
      type="text"
      class="form-control"
      v-model="term"
      ref="input"
      :placeholder="placeholder"
      @keyup="onKeyUp"
    />
    <v-icon v-if="done" @click.native="cancel" class="clickable">white-close</v-icon>
    <v-icon class="text-muted" :spin="searching" v-if="!done">{{ searching ? 'spinner' : withIcon ? 'search': '' }}</v-icon>
    <div class="entry-search__dropdown" v-if="dropdownVisible">
      <div class="entry-search__dropdown__results" v-if="results.total">
        <v-entry-list :items="results.items" :selectable="true" :actions="false" @selected="onSelected" />
      </div>
      <div class="entry-search__dropdown__empty" v-else>
        <slot name="no-results">Non ci sono risultati</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VEntryList, { VEntryInterface } from '@/components/VEntryList.vue';
import ClickOutside from '@/directives/ClickOutside';
import VIcon from '@/components/VIcon.vue';

const DEFAULT_PLACEHOLDER = 'Cerca...';
const DEFAULT_MIN = 3;
const DEFAULT_DELAY = 750;

export interface VEntrySearchResult {
  items: VEntryInterface[];
  total: number;
}

@Component({ components: { VEntryList, VIcon }, directives: { ClickOutside } })
export default class VEntrySearch extends Vue {
  @Prop({ default: DEFAULT_PLACEHOLDER }) readonly placeholder!: string;
  @Prop({ default: DEFAULT_MIN }) readonly min!: number;
  @Prop({ default: DEFAULT_DELAY }) readonly delay!: number;
  @Prop({ default: false }) readonly selectable!: boolean;
  @Prop({ default: 'right' }) readonly iconAlign!: string;
  @Prop({ default: false }) readonly withIcon!: boolean;
  @Prop({ required: true }) readonly load!: (query: string) => Promise<VEntryInterface[]>

  term = '';
  timeout: number|undefined;

  items: VEntryInterface[] = [];

  searching = false;

  dropdownVisible = false;

  done = false;

  get results(): VEntrySearchResult {
    return {
      items: this.items,
      total: this.items?.length || 0
    }
  }

  async search() {
    this.searching = true;
    await this.searchAll();
    this.searching = false;
    this.$emit('searched', this.results)

    if (this.selectable) {
      this.showDropdown();
    }
  }

  async searchItems() {
    this.items = await this.load(this.term);
  }

  public focus() {
    (this.$refs.input as HTMLInputElement).focus();
  }

  searchAll() {
    return this.searchItems();
  }

  clearSearch() {
    this.items = [];
    this.term = '';
  }

  @Watch('term')
  onTermChanged(val: string, newVal: string) {
    if (this.term === '') {
      this.search()
    }
  }

  emitResults() {
    this.$emit('searched', this.results);
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  cancel() {
    this.clearSearch();
    this.done = false;
    this.$emit('cancel');
  }

  protected showDropdown() {
    this.dropdownVisible = true;
  }

  protected closeDropdown() {
    this.dropdownVisible = false;
  }

  protected onKeyUp() {
    this.done = false;
    if (this.min && (this.term.length >= this.min)) {
      this.clearTimeout();

      this.timeout = window.setTimeout(() => {
        if (this.min && (this.term.length >= this.min)) {
          this.search();

          if (!this.selectable) {
            this.done = true;
          }
        }
      }, this.delay);
    } else if (this.term.length === 0) {
      this.clearSearch();
      this.done = false;
      this.$emit('cancel');
    }
  }

  protected onSelected(value: VEntryInterface) {
    this.term = value.name;
    this.done = true;
    this.$emit('selected', { ...value });
    this.closeDropdown();
  }
}
</script>

<style lang="scss" scoped>
@import "../css/vue";

.entry-search {
  width: 100%;
  display: inline-block;
  position: relative;

  > input {
    padding-right: $input-btn-padding-x * 1.75;
  }

  .icon {
    position: absolute;
    right: $input-btn-padding-x;
    top: 50%;
    transform: translateY(-55%);
  }

  &__dropdown {
    font-size: .875rem;
    width: 100%;
    height: 200px;
    padding: 0;
    position: absolute;
    z-index: $zindex-dropdown;
    margin-top: 5px;
    border-radius: .5rem;
    border: 1px solid $gray-300;
    box-shadow: 0px 3px 6px $gray-400;
    background-color: $white;

    > hr {
      margin: .5rem 0;
    }

    &__results {
      overflow-y: auto;
      position: absolute;
      padding: .25rem .5rem;
      top: 0;
      bottom: 0;
      width: 100%;
    }

    &__empty {
      @include center();
      font-style: italic;
    }
  }

  &--left {
    .icon {
      right: auto;
      left: $input-btn-padding-x;
    }

    > input {
      padding-left: $input-btn-padding-x * 2.5;
      padding-right: $input-btn-padding-x;
    }
  }
}
</style>
