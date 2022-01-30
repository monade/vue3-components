<template>
  <div class="datepicker" v-click-outside="closeDropdown">
    <div class="d-flex justify-content-between form-control">
      <v-inline-date-input
        :ref="inlineDateInputRef"
        @input="onInlineDateChanged"
        :value="inlineDate"
      />
      <div class="position-relative my-auto">
        <v-icon
          class="text-primary clickable"
          @click.native="toggleDropdown"
          :id="triggerId"
          size="sm"
          >calendar</v-icon
        >
      </div>
    </div>

    <transition name="fade">
      <div
        class="datepicker__dropdown datepicker-trigger"
        :class="`datepicker__dropdown--${dropdownAlign}`"
        v-show="visible"
        :key="airbnbKey"
      >
        <AirbnbStyleDatepicker
          :trigger-element-id="triggerId"
          mode="single"
          :months-to-show="monthsToShow"
          :show-not-in-month-days="true"
          :fullscreen-mobile="true"
          :date-one="timePickerDate"
          :show-action-buttons="false"
          :show-shortcuts-menu-trigger="false"
          @date-one-selected="onDateOneSelected"
          @closed="onClosed"
          :disabled="disabled"
          :offset-y="5"
          :inline="true"
          ref="datepicker"
        />

        <div class="datepicker__actions">
          <div class="d-flex justify-content-between">
            <button class="btn btn-link text-dark" @click="closeDropdown">
              CHIUDI
            </button>
            <button class="btn btn-link text-primary" @click="confirmRange">
              SELEZIONA
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VCheckButton from '@/components/VCheckButton.vue';
import ClickOutside from '../directives/ClickOutside';
import VInlineDateInput from '@/components/VInlineDateInput.vue';
import moment from 'moment';
import VIcon from "../components/VIcon.vue";
import { ENTER } from '@/utils/KeyboardHelper';
import { v1 as uuid } from 'uuid';
import {

  UK_DATE_FORMAT_DASHED
} from '@/utils/DateHelper';
import NoCache from '@/decorators/NoCache';

export interface DatePickerData {
  date?: number | null;
}

@Component({
  components: {
    VCheckButton,
    VIcon,
    VInlineDateInput
  },
  directives: {
    ClickOutside
  }
})
export default class VInlineDatePicker extends Vue {
  @Prop({ default: null }) readonly date?: number | null;
  @Prop({ default: null }) readonly placeholder?: string | null;
  @Prop({ default: false }) readonly disabled?: boolean;
  @Prop({ default: 'left' }) readonly dropdownAlign?: string;
  @Prop({}) readonly value!: string;

  private mode = 'single';
  @Watch('date')
  onDateChange(value: number | null) {
    if (this.date !== value) {
      this.dateOne = value;
    }
  }

  dateOne: number | null = null;
  protected datepicker: any = null;
  visible = false;
  firstOpen = true;

  subscription: any = null;

  private opened = false;
  private lastKey = `airbnb-date-picker-${this.dateOne}`;

  subscribe() {
    this.subscription = (e: KeyboardEvent) => {
      if (e.key === ENTER) {
        if (this.dateOne && !Number.isNaN(this.dateOne)) {
          this.$emit('blur');
        }
      }
    };

    window.addEventListener('keydown', this.subscription);
  }

  destroyed() {
    this.unsuscribe();
  }

  unsuscribe() {
    window.removeEventListener('keydown', this.subscription);
  }

  @NoCache
  get inlineDate() {
    return this.dateOne
      ? this.dateOne
      : new Date().getTime();
  }

  created() {
    this.dateOne = this.date || new Date().getTime();
    this.subscribe();
  }

  get inlineDateInputRef() {
    return `inlinedateInput-${uuid()}`;
  }

  @NoCache
  get timePickerDate() {
    return this.dateOne && !Number.isNaN(this.dateOne)
      ? moment(this.dateOne).format(UK_DATE_FORMAT_DASHED)
      : moment(new Date()).format(UK_DATE_FORMAT_DASHED);
  }

  @Watch('dateOne')
  onDateOneChanged(data: number | null) {
    if (data) {
      this.$emit('input', data);
    }
  }

  onInlineDateChanged(data: number) {
    this.dateOne = data;
  }

  mounted() {
    this.datepicker = this.$refs.datepicker;
    this.datepicker.width = 220;
  }

  get singleMode() {
    return this.mode === 'single';
  }

  get rangeMode() {
    return this.mode === 'range';
  }

  get monthsToShow() {
    return 1;
  }

  get randomValue() {
    return Math.random().toString(36).substr(2, 9);
  }

  get triggerId() {
    return 'datepicker-' + this.randomValue;
  }

  get dateOneChanged() {
    return this.dateOne !== this.date;
  }

  @NoCache
  get airbnbKey() {
    if (!this.opened) {
      this.lastKey = `airbnb-date-picker-${this.dateOne}`;
    }
    return this.lastKey;
  }

  toggleDropdown() {
    this.visible = !this.visible;

    if (!this.opened) {
      this.opened = true;
    }

    if (this.visible && this.firstOpen) {
      this.$nextTick(() => {
        if (this.datepicker) {
          this.datepicker.generateMonths();
          this.firstOpen = false;
        }
      });
    }
  }

  closeDropdown() {
    if (this.visible) {
      this.visible = false;
    }
  }

  confirmRange() {
    this.closeDropdown();
    if (this.dateOne) {
      this.emitSelected();
    }
  }

  emitSelected() {
    const data = {
      date: this.dateOne
    };
    this.$emit('selected', data);
  }

  onDateOneSelected(value: string) {
    if (value === 'Invalid Date') {
      this.dateOne = null;
    } else {
      this.dateOne = new Date(value).getTime();
    }
    this.$emit('date-selected', this.dateOne);
    if (this.singleMode && this.dateOneChanged) {
      this.emitSelected();
    }
  }

  onClosed() {
    if (this.rangeMode) {
      if (this.dateOne && this.dateOneChanged) {
        this.emitSelected();
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/css/vue";

.trigger-container {
  width: 20px;
  height: 20px;
}

.datepicker {
  position: relative;

  .form-control {
    padding-top: 0.45rem;
    padding-bottom: 0.45rem;
  }

  input[readonly] {
    @include input-with-icon($icon-calendar);
    cursor: pointer;
  }

  &__dropdown {
    position: absolute;
    z-index: $zindex-dropdown;
    margin-top: 5px;
    padding: 0;
    border-radius: 0.5rem;
    border: 1px solid $gray-300;
    box-shadow: 0px 3px 6px $gray-400;
    background-color: $white;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  &__actions {
    padding: 7px 15px 15px;
    font-size: $font-size-sm;
  }

  .asd__day {
    height: 25px;
    line-height: 25px;
    letter-spacing: 0.22px-0.13px;
    color: $body-color;
    font-size: $font-size-xs !important;
    border-color: $light !important;

    &--today {
      color: $primary !important;

      &.asd__day--selected {
        color: $white !important;
      }
    }

    &.asd__day--in-range {
      color: $body-color !important;
      background-color: rgba($primary, 0.3) !important;
      border-color: $light !important;
    }

    &.asd__selected-date-one {
      background-color: $primary !important;
      border-color: $light !important;
    }

    &.asd__selected-date-two {
      background-color: $primary !important;
      border-color: $light !important;
    }
  }

  .asd__wrapper {
    border: 0;
    background-color: transparent;
  }

  .asd__change-month-button {
    top: 8px;

    button {
      border: 0;
    }

    &.asd__change-month-button--previous button {
      padding-left: 0;
    }

    &.asd__change-month-button--next button {
      padding-right: 0;
    }
  }

  .asd__day--disabled,
  .asd__day--empty {
    opacity: 0.1 !important;
  }

  .asd__days-legend {
    top: 38px;
    font-size: $font-size-xs;
    padding: 0 11px;

    .asd__day-title {
      color: $text-color;
    }
  }

  .asd__month {
    // padding: 25px;
  }

  .asd__month-name {
    text-transform: capitalize;
    font-size: $font-size-sm;
    color: $primary;
    margin: 0 0 24px;
  }

  .asd__day-button {
    font-size: $font-size-xs;
  }
}
</style>
