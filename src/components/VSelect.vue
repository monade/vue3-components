<template>
  <span
    class="v-select"
    :class="{'v-select--open': showDropdown, 'v-select--expanded': expanded }"
    v-click-outside="closeDropdown"
  >
    <div class="d-flex h-100 position-relative">
      <div class="d-flex position-absolute h-100">
        <fa-icon icon="circle-notch" class="mx-2 my-auto text-primary" spin v-if="loading"></fa-icon>
      </div>
      <input v-if="!expanded" type="text" class="form-control my-auto" :class="inputClass" readonly :value="label" @click.prevent="toggleDropdown" :disabled="disabled" />
    </div>
    <input class="v-select__value" :required="required" v-model="value" />

    <div class="v-select__dropdown" v-show="showDropdown" :class="inputClass" ref="dropdown">
      <div
        class="v-select__options d-flex flex-column"
        :class="{ 'flex-column-reverse': addableAlign === 'bottom' }"
      >
        <div
          class="v-select__option v-select__option--add"
          :class="{ 'v-select__option--adding': adding }"
          v-if="addable"
          @click.stop="startAdding"
        >
          <template v-if="adding.enabled">
            <input
              type="text"
              class="form-control"
              v-model="adding.text"
              ref="input"
              @keyup.enter="add"
              @keyup.esc="stopAdding"
              placeholder="Inserisci descrizione..."
            />

            <button class="btn btn-link text-primary" @click.stop="add">
              <slot name="add-confirm"></slot>
            </button>
          </template>
          <template v-else>
            <slot name="add">Add</slot>
          </template>
        </div>
        <div :class="scrollable ?  'v-select__options--scrollable' : 'v-select__options'">
          <div
            class="v-select__option"
            :class="[{'v-select__option--selected': isSelected(option)}, inputClass]"
            v-for="option in selectableOptions"
            :key="option.id"
            @click.stop="select(option)"
          >
            <template v-if="editing && editing.id == option.id">
              <input
                type="text"
                class="form-control v-select__option--editing"
                v-model="editing.text"
                ref="editInput"
                @keyup.enter="edit"
                @keyup.esc="stopEditing"
                placeholder="Inserisci descrizione..."
              />
            </template>
            <template v-else>
              {{ option.text }}
              <template v-if="option.editable">
                <button
                  class="btn btn-link text-primary p-0 float-right"
                  @click.stop="startEditing(option)"
                >
                  <slot name="edit">Edit</slot>
                </button>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VIcon from './VIcon.vue';
import ClickOutside from '../directives/ClickOutside';

export interface VSelectOption {
  id: string;
  text: string;
  editable?: boolean;
  new?: boolean;
}

@Component({ components: { VIcon }, directives: { ClickOutside } })
export default class VSelect extends Vue {
  @Prop() readonly value!: string | null;
  @Prop({ default: 'Select an option' }) readonly placeholder?: string;
  @Prop() readonly options!: VSelectOption[];
  @Prop({ required: false }) readonly required!: boolean;
  @Prop({ default: false }) readonly addable!: boolean;
  @Prop({ default: false }) readonly editable!: boolean;
  @Prop({ default: false }) readonly expanded!: boolean;
  @Prop({ default: true }) readonly autoSort!: boolean;
  @Prop({ default: 'top' }) readonly addableAlign!: string;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: true }) readonly scrollable!: boolean;
  @Prop({ default: true }) readonly loading!: boolean;
  @Prop({ default: true }) readonly inputClass!: boolean;

  @Watch('value', { immediate: true })
  onValueChange() {
    this.updateSelected();
  }

  @Watch('options', { immediate: true })
  onOptionChange(value: VSelectOption[]) {
    this.selectableOptions = [...value];
    this.updateSelected();
  }

  dropdownVisible = false;
  editing: VSelectOption | null = null;

  selected: VSelectOption | null = null;
  selectableOptions: VSelectOption[] = [];

  adding = {
    enabled: false,
    text: ''
  };

  get showDropdown() {
    return this.dropdownVisible || this.expanded;
  }

  get label(): string {
    if (this.selected == null) {
      if (this.loading) {
        return '';
      }
      return this.placeholder || '';
    }

    return this.selected.text;
  }

  created() {
    this.updateSelected();
  }

  updateSelected() {
    if (this.value == null) {
      this.selected = null;
    } else {
      this.selected =
        this.selectableOptions.find(element => element.id === this.value) || null;
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown() {
    this.dropdownVisible = false;
  }

  select(option: VSelectOption) {
    this.selected = option;
    this.closeDropdown();
    this.$emit('input', this.selected.id);
  }

  add() {
    if (this.adding.text === '') {
      return;
    }

    const option: VSelectOption = {
      id: `new_${this.selectableOptions.length + 1}`,
      text: this.adding.text,
      new: true
    };

    if (this.editable) {
      option.editable = true;
    }

    this.selectableOptions.push(option);
    this.sortOptions();

    this.selected = option;

    this.stopAdding();
    this.closeDropdown();

    this.$emit('added', option);
  }

  startAdding() {
    this.adding.enabled = true;
    this.$nextTick(() => {
      (this.$refs.input as HTMLInputElement).focus();
    });
  }

  stopAdding() {
    this.adding.enabled = false;
    this.adding.text = '';
  }

  edit() {
    this.closeDropdown();

    this.$emit('edited', this.editing);
    this.stopEditing();
  }

  async startEditing(option: VSelectOption) {
    this.editing = option;
    await this.$nextTick();
    const edt: any[] = (this.$refs.editInput as any);
    return edt[0]?.focus();
  }

  stopEditing() {
    this.editing = null;
  }

  sortOptions() {
    if (!this.autoSort) {
      return;
    }
    this.selectableOptions.sort((a: VSelectOption, b: VSelectOption) => {
      if (a.text.toLowerCase() < b.text.toLowerCase()) {
        return -1;
      } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
        return 1;
      }

      return 0;
    });
  }

  isSelected(option: VSelectOption) {
    if (this.selected == null) {
      return false;
    }

    return this.selected.id === option.id;
  }
}
</script>

<style lang="scss">
@import "../css/vue";

$v-select-min-width: 200px !default;
$v-select-scrollable-max-heigh: 155px !default;

%v-select-input {
  background-color: transparent;
  border: 0;
  padding: 0;
  height: auto;
  border-radius: 0;
  caret-color: $primary;

  &::placeholder {
    padding-left: 6px;
  }

  &:focus {
    background-color: transparent;
  }
}

.v-select {
  display: block;
  position: relative;
  min-width: $v-select-min-width;

  &__value {
    width: 0;
    height: 1px;
    display: block;
    border: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  &:after {
    position: absolute;
    content: " ";
    right: 1rem;
    top: 0;
    width: 9px;
    height: 100%;
    margin-top: 2px; // Fix svg render issue

    @include background-image("../assets/icons/chevron-down.svg", contain);
  }

  &--open {
    &:after {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      margin-top: 0; // Fix svg render issue
    }
  }

  &--expanded {
    .v-select__dropdown {
      position: initial;
    }

    &:after {
      display: none;
    }
  }

  input {
    padding-right: 2rem;
    cursor: pointer;
    user-select: none;
  }

  &__dropdown {
    position: absolute;
    z-index: $zindex-dropdown;
    margin-top: 5px;
    padding: 0;
    border-radius: $input-border-radius;
    border: 1px solid $gray-100;
    box-shadow: 0px 3px 6px $gray-100;
    background-color: $white;
    min-width: $v-select-min-width;
    width: 100%;
  }

  &__options {
    width: 100%;

    &--scrollable {
      width: 100%;
      max-height: $v-select-scrollable-max-heigh;
      overflow-y: auto;
    }
  }

  &__option {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: 0;
    }

    &:hover {
      background-color: $gray-100;
    }

    &--add {
      color: $primary;
    }

    &--editing {
      @extend %v-select-input;
    }

    &--adding {
      display: flex;

      input {
        @extend %v-select-input;
      }
    }

    &--selected {
      background-color: $gray-100;
    }
  }
}
</style>
