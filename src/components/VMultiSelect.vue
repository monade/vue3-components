<template>
  <v-base-multi-select
    v-model="selected"
    :disabled="disabled"
    :confirm-selection="confirmSelection"
    :show-dropdown="dropdownVisible"
    :search-enabled="searchEnabled"
    :placeholder="placeholder"
    label="text"
    v-click-outside="onOutsideClick"
    @select-all="onSelectAll"
    @reset="onReset"
    @scroll="onScroll"
    @apply="onApply"
    @cleared="onCleared"
    @search="onSearch"
    @toggle-visible="onToggleVisible"
  >
    <template slot="dropdown-header">
      <span class="multiselect-dropdown-header d-flex align-items-center" v-if="actions">
        <span class="multiselect-dropdown-custom-actions">
          <ul class="list-inline list-actions">
            <li
              :class="getActionCssClass(action)"
              v-for="action in actions"
              :key="action.name"
              @click="onAction(action)"
            >
              {{ action.name }}
              <icon name="close-white" v-if="action.active" size="7px" class="ml-1 icon-white"></icon>
            </li>
          </ul>
        </span>
      </span>
    </template>

    <ul class="list-unstyled list-grouped-options" v-if="isGrouped">
      <li v-for="(group, index) in groupedOptions" :key="index">
        <span class="label text-primary" @click="onSelectGroup(group)">{{ group.name }}</span>

        <ul class="list-inline list-options">
          <li class="list-inline-item" v-for="(option, index2) in group.options" :key="index2">
            <v-checkbox v-model="selected" :input-value="option" :label="option.name"></v-checkbox>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="list-unstyled list-options" v-else>
      <li v-for="(option, index) in filteredOptions" :key="index">
        <div
          :data-index="index - maxElements / 2"
          v-if="(index - offset) < maxElements && ((index - offset) % maxElements) == 0"
          ref="upperSensor"
        ></div>

        <v-checkbox
          v-if="(index - offset) >= 0 && (index - offset) < maxElements"
          v-model="selected"
          :input-value="option"
          :label="option.name"
        ></v-checkbox>

        <div
          :data-index="index - maxElements / 2"
          v-if="(index - offset) >= maxElements && ((index - offset) % maxElements) == 0"
          ref="lowerSensor"
        ></div>
      </li>
    </ul>
  </v-base-multi-select>
</template>

<script lang="ts">
import VBaseMultiSelect from './VBaseMultiSelect.vue';
import VCheckbox from './VCheckbox.vue';
import ClickOutside from '@/directives/ClickOutside';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

export interface MultiSelectOption {
  id?: string;
  name: string;
  group?: string;
}

export interface MultiSelectGroup {
  id?: string;
  options: MultiSelectOption[] | null;
}

export interface MultiSelectAction {
  active: boolean;
  filter?: () => boolean;
}

@Component({ components: { VBaseMultiSelect, VCheckbox }, directives: { ClickOutside } })
export default class MultiSelect extends Vue {
  @Prop({ default: () => [], required: true }) readonly value!: any[];
  @Prop({ required: true }) readonly options!: MultiSelectOption[];
  @Prop() readonly actions!: MultiSelectAction[] | null;
  @Prop() readonly groups!: MultiSelectGroup[] | null;
  @Prop() groupBy!: (options: MultiSelectOption[], group: MultiSelectGroup) => MultiSelectOption[] | null;
  @Prop({ default: 'Seleziona un valore' }) readonly placeholder!: string;
  @Prop({ default: 'name' }) readonly label!: string;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: false }) readonly confirmSelection!: boolean;
  @Prop({ default: false }) readonly showDropdown!: boolean;
  @Prop({ default: false }) readonly searchEnabled!: boolean;

  private selected = this.value;
  private maxElements = 50;
  private offset = 0;
  private search: string | null = null;
  private dropdownVisible = false;

  @Watch('value')
  onValueChanged(value: any[]) {
    this.selected = value;
  }

  @Watch('disabled')
  onDisabledChanged(value: boolean) {
    if (value) {
      this.selected = [];
    }
  }

  onOutsideClick() {
    this.dropdownVisible = false;
  }

  @Watch('selected')
  onSelectedChanged(value: any[]) {
    if (!this.confirmSelection) {
      this.$emit('input', value);
    }
  }

  get isGrouped() {
    return this.groups && this.groups.length;
  }

  get groupedOptions() {
    if (!this.groups) {
      return [];
    }
    return this.groups
      .map(group => {
        group.options = this.getGroupedOptions(group);
        return group;
      })
      .filter(group => {
        return (group.options?.length || 0) > 0;
      });
  }

  get filteredOptions() {
    if (this.search) {
      return this.options.filter(option => {
        return (
          option.name.toLowerCase().indexOf(this.search?.toLowerCase() || '') > -1
        );
      });
    } else {
      return this.options;
    }
  }

  getActionCssClass(action: MultiSelectAction) {
    return {
      'list-inline-item': true,
      active: action.active
    };
  }

  getGroupedOptions(group: MultiSelectGroup) {
    if (this.groupBy instanceof Function) {
      return this.groupBy(this.options, group);
    } else {
      return this.options.filter(element => {
        let valid = element.group === group.id;

        if (this.search) {
          valid =
            valid &&
            element.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
        }

        return valid;
      });
    }
  }

  onSelectAll() {
    this.selected = [];

    for (const option of this.filteredOptions) {
      this.selected.push(option);
    }

    if (this.actions) {
      this.actions.map(element => {
        return (element.active = true);
      });
    }
  }

  onSelectGroup(group: { id: string }) {
    const filtered = this.filteredOptions.filter(
      element => element.group === group.id
    );
    const selectedSize = this.selected?.length || 0;
    this.selected = [...new Set([...this.selected, ...filtered])];
    if (selectedSize === this.selected.length) {
      this.selected = this.selected.filter(x => !filtered.includes(x));
    }
  }

  onReset() {
    if (this.actions) {
      this.actions.map(element => {
        return (element.active = false);
      });
    }
  }

  onApply() {
    this.dropdownVisible = false;
    this.$emit('input', this.selected);
  }

  onCleared() {
    if (this.confirmSelection) {
      this.$emit('input', this.selected);
    }
  }

  onScroll(e: Event, holder: HTMLElement | null) {
    if (!holder) {
      return;
    }
    if (!holder.getBoundingClientRect) {
      return;
    }
    const upperSensors = this.$refs.upperSensor as Element[];
    const lowerSensors = this.$refs.lowerSensor as Element[];

    if (upperSensors) {
      const holderRect = holder.getBoundingClientRect();

      for (let i = 0; i < upperSensors.length; i++) {
        const sensor = upperSensors[i];
        const { top, bottom, height } = sensor.getBoundingClientRect();
        if (holderRect.top - top < 0) {
          this.offset = parseInt(sensor.getAttribute('data-index') || '0');
          break;
        }
      }
    }

    if (lowerSensors) {
      const holderRect = holder.getBoundingClientRect();

      for (let i = lowerSensors.length - 1; i >= 0; i--) {
        const sensor = lowerSensors[i];
        const { top, bottom, height } = sensor.getBoundingClientRect();
        if (holderRect.bottom - top > 0) {
          this.offset = parseInt(sensor.getAttribute('data-index') || '0');
          break;
        }
      }
    }
  }

  onAction(action: MultiSelectAction) {
    if (action.filter && action.filter instanceof Function) {
      const filtered = this.filteredOptions.filter(action.filter);

      if (action.active) {
        this.selected = this.selected.filter(
          element => filtered.indexOf(element) === -1
        );
        action.active = false;
      } else {
        this.selected = [...new Set([...this.selected, ...filtered])];
        action.active = true;
      }
    }
  }

  onSearch(term: string) {
    this.search = term;
  }

  onToggleVisible(visible: boolean) {
    if (visible) {
      this.offset = 0;
    }

    this.dropdownVisible = visible;
  }
}
</script>

<style lang="scss" scoped>
@import "@/css/vue";

.multiselect-dropdown-header {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid $border-color;

  .multiselect-dropdown-actions {
    font-size: $font-size-sm;
    font-weight: bold;
  }
}

ul {
  margin-bottom: 0 !important;

  &.list-options {
    > li {
      padding: 0.25rem 0;
      min-height: 30px;
      vertical-align: top;
    }
  }

  &.list-grouped-options {
    > li {
      padding-bottom: 1.5rem;
      font-size: $font-size-sm;
      vertical-align: top;

      .label {
        color: $gray-600;
        display: block;
        cursor: pointer;
      }

      > ul {
        margin-top: 0.5rem;

        > li {
          width: 22.5%;
        }
      }
    }
  }

  &.list-actions {
    > li {
      cursor: pointer;
      border: 1px solid $blue;
      color: $blue;
      font-size: $font-size-sm;
      padding: 0.15rem 0.25rem;

      &.active {
        background-color: $blue;
        color: $white;

        .icon {
          margin-top: 0.25rem;
        }
      }
    }
  }
}
</style>
