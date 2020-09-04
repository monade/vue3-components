<template>
  <div class="comparison-group-select" v-click-outside="closeDropdown" :class="componentClass">
    <input type="text" class="form-control" readonly :value="label" @click.prevent="toggleDropdown" />
    <transition name="fade">
    <div class="comparison-group-select__dropdown" v-show="visible">
      <v-comparison-group-editor ref="editor" @selected="onSelected" @ready="onReady" :load-groups="loadGroups" :create-group="createGroup" :add-entry-to-group="addEntryToGroup" :remove-entry-from-group="removeEntryFromGroup"/>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VComparisonGroupEditor from './VComparisonGroupEditor.vue';
import EntryGroupItem from '../models/EntryGroupItem';
import Entry from '../models/Entry';

const DEFAULT_PLACEHOLDER = 'Selezionare un gruppo';

@Component({
  components: {
    VComparisonGroupEditor
  }
})
export default class ComparisonGroupSelect extends Vue {
  @Prop() value!: EntryGroupItem|null;
  @Prop({ default: DEFAULT_PLACEHOLDER }) placeholder? : string;
  @Prop({ default: true }) selectLast? : boolean;
  @Prop({ default: null }) payload: any;
  @Prop({ default: () => { return Promise.resolve([]); } }) loadGroups!: (payload: any|null) => Promise<EntryGroupItem[]>;
  @Prop({ default: () => { return Promise.resolve({}); } }) createGroup!: (group: EntryGroupItem) => Promise<EntryGroupItem>;
  @Prop({ default: (entry: Entry, group: EntryGroupItem) => { return Promise.resolve(); } }) addEntryToGroup!: (entry: Entry, group: EntryGroupItem) => Promise<void>;
  @Prop({ default: (entry: Entry, group: EntryGroupItem) => { return Promise.resolve(); } }) removeEntryFromGroup!: (entry: Entry, group: EntryGroupItem) => Promise<void>;

  visible = false;
  enabled = false;

  selected: EntryGroupItem|null = null;

  get label(): string {
    if (this.selected === null) {
      return this.placeholder || DEFAULT_PLACEHOLDER;
    }

    return this.selected.title + ` (${this.selected.entries?.length})`;
  }

  get componentClass() {
    return {
      'comparison-group-select--disabled': this.enabled === false
    }
  }

  created() {
    this.selected = this.value ? JSON.parse(JSON.stringify(this.value)) : null;
  }

  toggleDropdown() {
    if (this.enabled === false) {
      return;
    }

    this.visible = !this.visible;
  }

  closeDropdown() {
    if (this.visible) {
      this.visible = false;
    }
  }

  emitValue() {
    this.$emit('input', this.selected ? JSON.parse(JSON.stringify(this.selected)) : null);
  }

  onReady() {
    this.enabled = true;

    if (this.selectLast) {
      const group = localStorage.getItem(`${this.$options.name}-group`);

      if (group) {
        (this.$refs.editor as VComparisonGroupEditor).selectById(group);
      }

      if (!this.selected) {
        (this.$refs.editor as VComparisonGroupEditor).selectFirst();
      }
    } else {
      (this.$refs.editor as VComparisonGroupEditor).selectFirst();
    }

    this.$emit('ready');
  }

  onSelected(group: EntryGroupItem) {
    this.selected = group;
    this.emitValue();

    localStorage.setItem(`${this.$options.name}-group`, group.id);
  }
}

</script>

<style lang="scss">
  @import '../css/vue';

  .comparison-group-select {
    position: relative;
    display: inline-block;

    > input {
      @include input-with-icon($icon-chevron-down);
      cursor: pointer;
      @extend %user-select-none;
    }

    &__dropdown {
      width: 500px;
      height: 235px;
      background-color: $white;
      box-shadow: 0px 3px 6px $gray-400;
      border: 1px solid $gray-300;
      position: absolute;
      border-radius: .5rem;
      margin-top: 5px;
      z-index: $zindex-dropdown;
      padding: 0;
      overflow: hidden;
    }

    &--disabled {
      > input {
        background-color: $gray-200 !important;
        cursor: default;
      }
    }
  }
</style>
