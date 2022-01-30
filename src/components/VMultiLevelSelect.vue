<template>
  <div class="multilevel-select" v-click-outside="closeDropdown">
    <input type="text" class="form-control" readonly :value="label" @click.prevent="toggleDropdown" />
    <v-multi-level-dropdown
      @leave="closeDropdown"
      @selected="onSelected"
      :options="items"
      :headers="headers"
      v-show="visible"
      :multiple="multiple" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SelectOption from '../models/SelectOption';
import VMultiLevelDropdown from './VMultiLevelDropdown.vue';
import ClickOutside from '../directives/ClickOutside';

const DEFAULT_PLACEHOLDER = 'Selezionare una voce';

export interface MultiLevelObject extends SelectOption {
  [key: string]: string|number|Array<MultiLevelObject>|boolean|undefined;
  children?: Array<MultiLevelObject>;
  selected?: boolean;
  locked?: boolean;
  partial?: boolean;
}

export interface MultiLevelMultipleObject {
  [key: number]: MultiLevelObject[];
}

@Component({
  components: {
    VMultiLevelDropdown
  },
  directives: {
    ClickOutside
  }
})
export default class VMultiLevelSelect extends Vue {
  @Prop() readonly value!: string|Array<string[]>|null;
  @Prop({ default: DEFAULT_PLACEHOLDER }) readonly placeholder!: string;
  @Prop({ default: () => { return []; } }) readonly headers? : Array<string>;
  @Prop({ default: () => { return []; } }) readonly options!: Array<MultiLevelObject>;
  @Prop({ default: false }) readonly multiple!: boolean;

  @Watch('value')
  onValueChange(value: string|Array<string[]>|null) {
    this.updateSelected(value);
  }

  created() {
    this.items = [...this.options];
  }

  mounted() {
    this.updateSelected(this.value);
  }

  visible = false;
  items: MultiLevelObject[] = [];
  selected: MultiLevelObject|null = null;
  selectedMultiple: MultiLevelMultipleObject = {};

  get label(): string {
    if (this.multiple) {
      let first: MultiLevelObject|null = null;
      let count = 0;

      for (const level in this.selectedMultiple) {
        if (first == null && this.selectedMultiple[level] && this.selectedMultiple[level].length) {
          first = this.selectedMultiple[level][0];
        }

        count += this.selectedMultiple[level].length;
      }

      if (count && first) {
        let label = first.text;

        if (count > 1) {
          label += ` + altre ${count - 1}`;
        }

        return label;
      } else {
        return this.placeholder || DEFAULT_PLACEHOLDER;
      }
    } else {
      if (this.selected == null) {
        return this.placeholder || DEFAULT_PLACEHOLDER;
      }

      return this.selected.text;
    }
  }

  toggleDropdown() {
    this.visible = !this.visible;
  }

  closeDropdown() {
    if (this.visible) {
      this.visible = false;
    }
  }

  updateSelected(value: string|Array<string[]>|null) {
    if (this.multiple && Array.isArray(value)) {
      this.selectedMultiple = {};

      for (let i = 0; i < (value as Array<string[]>).length; i++) {
        this.selectedMultiple[i] = [];
      }

      this.updateSelectedMultiple(this.options, 0);
    } else {
      if (value && this.items) {
        const option = this.items.find(e => e.id === value);

        if (option) {
          this.selected = option;
        }
      }
    }
  }

  updateSelectedMultiple(options: MultiLevelObject[], level: number, parent: MultiLevelObject|null = null) {
    options.map((option) => {
      if (this.value && this.value[level]) {
        option.selected = this.value[level].indexOf(option.id) >= 0;

        if (option.selected) {
          this.selectedMultiple[level].push(option);

          if (parent && parent.selected === false) {
            this.$set(parent, 'partial', true);
          }
        } else if (parent && parent.selected) {
          option.selected = true;
        }

        if (option.children && option.children.length) {
          this.updateSelectedMultiple(option.children, level + 1, option);
        }

        return option;
      }
    })
  }

  processMultipleOptions(options: MultiLevelObject[], level = 0) {
    if (!this.selectedMultiple[level]) {
      this.selectedMultiple[level] = [];
    }

    options.forEach(option => {
      if (option.selected) {
        this.selectedMultiple[level].push(option);
      }

      if (option.partial && option.children) {
        this.processMultipleOptions(option.children, level + 1);
      }
    })
  }

  emitMultipleValue() {
    const length = (this.value as Array<string[]>).length;
    const empty: string[] = [];
    const value = Array(length).map(() => empty);

    for (let i = 0; i < length; i++) {
      if (this.selectedMultiple[i] === undefined) {
        value[i] = [];
      } else {
        value[i] = this.selectedMultiple[i].map(element => {
          return element.id;
        })
      }
    }

    this.$emit('input', value);
  }

  onSelected(option: MultiLevelObject, level: number) {
    if (this.multiple) {
      if (this.items) {
        this.selectedMultiple = {};
        this.processMultipleOptions(this.items, 0);
        this.emitMultipleValue();
      }
    } else {
      this.closeDropdown();
      this.selected = option;
      this.$emit('input', option.id);
    }

    this.$emit('selected', option, level);
  }
}
</script>

<style lang="scss">
  @import '../css/vue';

  $multiselect-dropdown-padding-x: 1rem;
  $multiselect-dropdown-padding-y: .5rem;
  $multiselect-dropdown-width: 240px;

  .multilevel-select {
    position: relative;
    display: inline-block;
    @extend %user-select-none;

    input {
      @include input-with-icon($icon-chevron-down);
      cursor: pointer;
      @extend %user-select-none;
    }

    &__dropdown {
      @extend %dropdown;
      border-radius: 0;
      padding: $multiselect-dropdown-padding-y $multiselect-dropdown-padding-x;
      font-size: $font-size-sm;
      width: $multiselect-dropdown-width;

      &--nested {
        @extend %dropdown;
        border-radius: 0;
        margin-top: 0;
        padding: $multiselect-dropdown-padding-y $multiselect-dropdown-padding-x;
        position: absolute;
        width: $multiselect-dropdown-width;
        left: $multiselect-dropdown-width;
        top: 0;

        &.multilevel-select__dropdown--with-header {
          top: -25px;
        }
      }

      &.multilevel-select__dropdown--with-header {
        .multilevel-select__menu {
          > .multilevel-select__menu--item {
            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }

    &__menu {
      ul {
        margin-bottom: 0;
      }

      &--header {
        text-transform: uppercase;
        font-size: $font-size-xs;
        color: $secondary;
        margin-bottom: .375rem;
      }

      &--item {
        position: relative;
        cursor: pointer;
        padding: $multiselect-dropdown-padding-y $multiselect-dropdown-padding-x;
        margin-left: -$multiselect-dropdown-padding-x;
        margin-right: -$multiselect-dropdown-padding-x;

        &:hover {
          background-color: rgba($success, .25);
        }

        &:first-child {
          margin-top: -$multiselect-dropdown-padding-y;
        }

        &:last-child {
          margin-bottom: -$multiselect-dropdown-padding-y;
        }

        &.selected, &.partial {
          > .multilevel-select__menu__button {
            background-color: $primary;
            color: $white;
          }
        }

        &.locked {
          color: $gray-500;
          cursor: default;

          .icon {
            padding: 0 3px;
            margin-right: .5rem;
          }
        }
      }

      &--multiple {
        .multilevel-select__menu--item {
          display: flex;
        }
      }

      &__button {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: .5rem;
        background-color: $white;
        border: 1px solid $primary;
        border-radius: 2px;
        position: relative;
        flex-shrink: 0;

        .icon {
          @include center();
        }
      }
    }
  }
</style>
