<template>
  <span :class="containerCssClass" class="multiselect-container" @clickOutside="hideDropdown">
    <span :class="selectionCssClass" class="multiselect-selection" @click="toggleDropdown">
      <span class="multiselect-result" v-html="result"></span>
      <span class="multiselect-icon" @click.stop="toggleDropdownOrClearResult"></span>
    </span>
    <transition name="fade">
      <span class="multiselect-dropdown" v-if="dropdownVisible">
        <span class="multiselect-dropdown-search d-flex" v-if="searchEnabled">
          <span class="multiselect-icon" @click.stop="clearSearch" v-if="search"></span>
          <input
            type="text"
            class="form-control"
            v-model="search"
            ref="searchInput"
            placeholder="Cerca..."
          />
        </span>
        <slot name="dropdown-header"></slot>

        <span @scroll="onScroll" ref="scroll" class="multiselect-dropdown-body">
          <slot></slot>
        </span>
        <span class="multiselect-dropdown-footer d-flex align-items-center">
          <span class="multiselect-dropdown-actions">
            <a href="#selectAll" class="mr-2" @click.prevent="selectAll">SELEZIONA TUTTE</a>
            <a href="#reset" @click.prevent="reset">RESET</a>
          </span>
          <span class="ml-auto multiselect-dropdown-actions" v-if="confirmSelection">
            <a href="#apply" class="mr-2 text-success" @click.prevent="apply">APPLICA</a>
          </span>
        </span>
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
import ClickOutside from '../directives/ClickOutside';

import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({ directives: { ClickOutside } })
export default class VBaseMultiSelect extends Vue {
  @Prop({ default: () => [] }) readonly value!: any[] | null;
  @Prop({ default: 'Seleziona un valore' }) readonly placeholder!: string;
  @Prop({ default: 'name' }) readonly label!: string;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: false }) readonly confirmSelection!: boolean;
  @Prop({ default: false }) readonly showDropdown!: boolean;
  @Prop({ default: false }) readonly searchEnabled!: boolean;

  private dropdownVisible = this.showDropdown;
  private selected = this.value;
  private search: string | null = null;

  @Watch('value')
  onValueChanged(value: any[] | null) {
    this.selected = value;
  }

  @Watch('showDropdown')
  onShowDropdownChanged(value: boolean) {
    if (!value) {
      this.hideDropdown();
    }
  }

  @Watch('search')
  onSearchChanged(value: string | null) {
    this.$emit('search', value);
  }

  get containerCssClass() {
    return {
      'multiselect-open': this.dropdownVisible,
      'multiselect-disabled': this.disabled
    };
  }

  get selectionCssClass() {
    const length = this.selected?.length || 0;
    return {
      'multiselect-empty': length === 0,
      'multiselect-selected': length > 0,
      'multiselect-open': this.dropdownVisible
    };
  }

  get result() {
    if (this.selected?.length === 0) {
      return this.placeholder;
    } else {
      return this.selected?.map(e => e.name).join(', ');
    }
  }

  toggleDropdown() {
    if (this.disabled) {
      return;
    }

    this.dropdownVisible = !this.dropdownVisible;
    this.$emit('toggle-visible', this.dropdownVisible);

    if (this.searchEnabled && this.dropdownVisible) {
      this.$nextTick(() => {
        (this.$refs.searchInput as HTMLInputElement).focus();
      });
    }
  }

  hideDropdown() {
    this.dropdownVisible = false;
  }

  toggleDropdownOrClearResult() {
    if (this.disabled) {
      return;
    }

    if (this.selected?.length === 0) {
      this.toggleDropdown();
      return;
    }

    this.selected = [];
    this.$emit('input', this.selected);
    this.$emit('cleared');
  }

  selectAll() {
    this.$emit('select-all');
  }

  reset() {
    this.selected = [];
    this.$emit('input', this.selected);
    this.$emit('reset');
  }

  apply() {
    this.$emit('apply');
  }

  onScroll(e: Event) {
    this.$emit('scroll', e, this.$refs.scroll);
  }

  clearSearch() {
    this.search = null;
  }
}
</script>

<style lang="scss" scoped>
@import "@/css/vue";

$close-icon: 'none';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.multiselect-wrapper {
  display: block;
}

.multiselect-container {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;

  &.multiselect-open {
    z-index: 100;
  }
}

.multiselect-open {
  .multiselect-selection {
    z-index: 20;
  }
}

.multiselect-selection {
  width: 100%;
  display: inline-block;

  background-color: $white;

  height: 2rem;

  cursor: pointer;
  position: relative;

  @include border-radius($custom-select-border-radius);

  .multiselect-result {
    line-height: 2rem;
    display: block;
    padding-right: 2rem;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .multiselect-icon {
    background-image: $close-icon;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 10px;
    height: 2rem;
    right: 1rem;
    top: 0;
    position: absolute;
    transition: all 0.25s ease;
  }

  &.multiselect-empty {
    .multiselect-result {
      color: $gray-600;
    }
  }

  &.multiselect-open {
    .multiselect-icon {
      transform: rotate(180deg);
    }
  }

  &.multiselect-selected {
    .multiselect-icon {
      background-image: $close-icon;
    }

    &.multiselect-open {
      .multiselect-icon {
        transform: none;
      }
    }
  }
}

.multiselect-dropdown {
  display: block;
  position: absolute;
  background-color: $white;
  padding-top: 1rem;
  width: 100%;
  z-index: 10;
  top: 2rem;
  user-select: none;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

  .multiselect-dropdown-search {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid $border-color;
    display: block;
    position: relative;

    .multiselect-icon {
      background-image: $close-icon;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 10px;
      height: 2rem;
      right: 2rem;
      top: 50%;
      position: absolute;
      transition: all 0.25s ease;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .multiselect-dropdown-footer {
    padding: 1.25rem 1rem;
    border-top: 1px solid $border-color;

    .multiselect-dropdown-actions {
      font-size: $font-size-sm;
      font-weight: bold;
    }
  }

  .multiselect-dropdown-body {
    padding: 1rem;
    display: block;
    max-height: 280px;
    overflow: auto;
  }
}

.multiselect-disabled {
  .multiselect-selection {
    cursor: not-allowed;

    .multiselect-result {
      color: $black;
    }
  }
}
</style>
