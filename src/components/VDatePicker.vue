<template>
  <div class="datepicker" v-click-outside="closeDropdown">
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :value="selected"
      :id="triggerId"
      @click="toggleDropdown"
      readonly
    />

    <transition name="fade">
    <div class="datepicker__dropdown" :class="`datepicker__dropdown--${dropdownAlign}`" v-show="visible">
      <AirbnbStyleDatepicker
        :trigger-element-id="triggerId"
        :mode="mode"
        :months-to-show="monthsToShow"
        :show-not-in-month-days="true"
        :fullscreen-mobile="true"
        :date-one="dateOne"
        :date-two="dateTwo"
        :show-action-buttons="false"
        :show-shortcuts-menu-trigger="false"
        :end-date="endDate"
        @date-one-selected="onDateOneSelected"
        @date-two-selected="onDateTwoSelected"
        @closed="onClosed"
        :disabled="disabled"
        :offset-y="5"
        :inline="true"
        ref="datepicker"
      />

      <div class="datepicker__actions">
        <div class="pb-3">
          <button class="btn btn-flat btn-outline-primary btn-sm mr-1 mb-1" @click="selectLastDays(7)">Ultimi 7 giorni</button>
          <button class="btn btn-flat btn-outline-primary btn-sm mr-1 mb-1" @click="selectLastDays(30)">Ultimi 30 giorni</button>
          <button class="btn btn-flat btn-outline-primary btn-sm mr-1 mb-1" @click="selectLastDays(365)">Ultimi 365 giorni</button>
          <button class="btn btn-flat btn-outline-primary btn-sm mr-1 mb-1" @click="selectStartOfToToday('month')">Da inizio mese</button>
          <button class="btn btn-flat btn-outline-primary btn-sm mr-1 mb-1" @click="selectStartOfToToday('year')">Da inizio anno</button>
          <button class="btn btn-flat btn-outline-primary btn-sm mr-1 mb-1" @click="selectStartOfToToday('isoWeek')">Questa settimana</button>
        </div>
        <div class="pt-2 pb-3 compare-select" v-if="compare">
          <span>Confronta con:</span>
          <ul class="list-unstyled">
            <li>
              <v-check-button :value="compared.type == 'year'" @input="compared.type = 'year'">Anno precedente
                <span v-if="rangeSelected">({{ compareYearRange }})</span>
              </v-check-button>
            </li>
            <li>
              <v-check-button :value="compared.type == 'period'" @input="compared.type = 'period'">Periodo precedente
                <span v-if="rangeSelected">({{ comparePeriodRange }})</span>
              </v-check-button>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn btn-link text-dark" @click="closeDropdown">CHIUDI</button>
          <button class="btn btn-link text-primary" @click="confirmRange">SELEZIONA</button>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VCheckButton from './VCheckButton.vue';
import ClickOutside from '../directives/ClickOutside';

export const DATE_FORMAT = 'YYYY-MM-DD';

export interface DatePickerData {
  date?: Date | string | undefined;
  range?: {
    from: Date | string | undefined;
    to: Date | string | undefined;
  };
  compare?: {
    from: Date | string | undefined;
    to: Date | string | undefined;
  };
}

@Component({
  components: {
    VCheckButton
  },
  directives: {
    ClickOutside
  }
})
export default class VDatePicker extends Vue {
  @Prop({ default: undefined }) readonly date? : Date|string|undefined;
  @Prop({ default: undefined }) readonly dateTo? : Date|string|undefined;
  @Prop({ default: null }) readonly endDate? : Date|string|null;
  @Prop({ default: 'DD/MM/YYYY' }) readonly format? : string;
  @Prop({ default: 'range' }) readonly mode? : string;
  @Prop({ default: null }) readonly placeholder? : string|null;
  @Prop({ default: false }) readonly disabled? : boolean;
  @Prop({ default: 'left' }) readonly dropdownAlign? : string;
  @Prop({ default: false }) readonly compare? : boolean;

  @Watch('date')
  onDateChange(value: Date|string) {
    this.dateOne = value;
  }

  @Watch('dateTo')
  onDateToChange(value: Date|string) {
    this.dateTwo = value;
  }

  dateOne: Date|string|undefined = '';
  dateTwo: Date|string|undefined = '';
  protected datepicker: any|null = null;
  visible = false;
  selected: string|null = null;
  firstOpen = true;

  compared = {
    type: 'year',
    from: null,
    to: null
  };

  created() {
    this.dateOne = this.date;
    this.dateTwo = this.dateTo;

    if (this.date || this.dateTo) {
      this.selected = this.formattedValue();
    }
  }

  mounted() {
    this.datepicker = this.$refs.datepicker as any;
    this.datepicker.width = 220;
  }

  get singleMode() {
    return this.mode === 'single';
  }

  get rangeMode() {
    return this.mode === 'range';
  }

  get monthsToShow() {
    return this.rangeMode ? 2 : 1;
  }

  get randomValue() {
    return Math.random().toString(36).substr(2, 9);
  }

  get triggerId() {
    return 'datepicker-' + this.randomValue;
  }

  get dateOneChanged() {
    return this.dateOne !== this.$moment(this.date).format(DATE_FORMAT);
  }

  get dateTwoChanged() {
    return this.dateTwo !== this.$moment(this.dateTo).format(DATE_FORMAT);
  }

  get compareYearRange() {
    if (this.rangeSelected === false) {
      return null
    } else {
      const range = this.getCompareRange('year');
      return this.$moment(range.from).format(this.format) + ' - ' + this.$moment(range.to).format(this.format);
    }
  }

  get comparePeriodRange() {
    if (this.rangeSelected === false) {
      return null
    } else {
      const range = this.getCompareRange('period');
      return this.$moment(range.from).format(this.format) + ' - ' + this.$moment(range.to).format(this.format);
    }
  }

  get rangeSelected() {
    return this.dateOne !== '' && this.dateTwo !== '';
  }

  toggleDropdown() {
    this.visible = !this.visible;

    if (this.visible && this.firstOpen && this.endDate) {
      this.$nextTick(() => {
        if (this.datepicker) {
          this.datepicker.startingDate = this.$moment(this.endDate).subtract(2, 'months').startOf('month');
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
    this.selected = this.formattedValue();

    if (this.dateOne && this.dateTwo) {
      this.emitSelected();
    }
  }

  formattedValue() {
    let value = '';

    if (this.dateOne) {
      value = this.$moment(this.dateOne).format(this.format);
    }
    if (this.dateTwo) {
      value += ' - ' + this.$moment(this.dateTwo).format(this.format);
    }

    return value;
  }

  selectLastDays(days: number) {
    if (this.datepicker) {
      const start = this.$moment(this.endDate).subtract(days - 1, 'days');
      const end = this.$moment(this.endDate);
      this.datepicker.selectedDate1 = start.format(DATE_FORMAT);
      this.datepicker.selectedDate2 = end.format(DATE_FORMAT);
    }
  }

  selectStartOfToToday(startOf: moment.unitOfTime.StartOf) {
    if (this.datepicker) {
      const end = this.$moment(this.endDate);
      const start = end.clone().startOf(startOf);

      this.datepicker.selectedDate1 = start.format(DATE_FORMAT);
      this.datepicker.selectedDate2 = end.format(DATE_FORMAT);
    }
  }

  emitSelected() {
    let data: DatePickerData;

    if (this.singleMode) {
      data = {
        date: this.dateOne
      }

      this.$emit('selected', data);
    } else {
      data = {
        range: {
          from: this.dateOne,
          to: this.dateTwo
        }
      };

      if (this.compare) {
        data.compare = this.getCompareRange(this.compared.type);
      }

      this.$emit('selected', data);
    }
  }

  getCompareRange(type: string): {
    from: Date | string | undefined;
    to: Date | string | undefined;
  } {
    if (!this.rangeSelected) {
      return {
        from: undefined,
        to: undefined
      }
    }

    const dateOne = this.$moment(this.dateOne);
    const dateTwo = this.$moment(this.dateTwo);

    let from, to;

    if (type === 'year') {
      from = this.$moment(this.dateOne).subtract('1', 'years');
      to = this.$moment(this.dateTwo).subtract('1', 'years');
    } else {
      const startOfMonth = dateOne.clone().startOf('month');
      const endOfMonth = dateTwo.clone().endOf('month');

      if (dateOne.isSame(startOfMonth, 'day') && dateTwo.isSame(endOfMonth, 'day')) {
        const diff = dateTwo.diff(dateOne, 'months');
        from = dateOne.subtract(diff + 1, 'months');
        to = dateTwo.subtract(diff + 1, 'months');
        to.endOf('month');
      } else {
        const diff = dateTwo.diff(dateOne, 'days');
        from = dateOne.subtract(diff + 1, 'days');
        to = this.$moment(this.dateOne).subtract('1', 'days');
      }
    }

    return {
      from: from.format(DATE_FORMAT),
      to: to.format(DATE_FORMAT)
    }
  }

  onDateOneSelected(value: Date|string) {
    this.dateOne = value;
    this.$emit('date-selected', this.dateOne);

    if (this.singleMode && this.dateOneChanged) {
      // this.$emit('selected', this.dateOne);
      this.emitSelected();
    }
  }

  onDateTwoSelected(value: Date|string) {
    this.dateTwo = value;
    this.$emit('date-to-selected', this.dateTwo);
  }

  onClosed() {
    if (this.rangeMode) {
      if (this.dateOne && this.dateTwo && (this.dateOneChanged || this.dateTwoChanged)) {
        // this.$emit('selected', [this.dateOne, this.dateTwo]);
        this.emitSelected();
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../css/vue';

  .datepicker {
    position: relative;

    input[readonly] {
      @include input-with-icon($icon-calendar);
      cursor: pointer;
    }

    &__dropdown {
      position: absolute;
      z-index: $zindex-dropdown;
      margin-top: 5px;
      padding: 0;
      border-radius: .5rem;
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
      border-color: $porcelain !important;

      &--today {
        color: $primary !important;

        &.asd__day--selected {
          color: $white !important;
        }
      }

      &.asd__day--in-range {
        color: $body-color !important;
        background-color: rgba($primary, .3) !important;
        border-color: $porcelain !important;
      }

      &.asd__selected-date-one {
        background-color: $primary !important;
        border-color: $porcelain !important;
      }

      &.asd__selected-date-two {
        background-color: $primary !important;
        border-color: $porcelain !important;
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

    .asd__day--disabled, .asd__day--empty {
      opacity: 0.1 !important;
    }

    .asd__days-legend {
      top: 38px;
      font-size: $font-size-xs;
      padding: 0 11px;

      .asd__day-title {
        color: $secondary;
      }
    }

    .asd__month {
      // padding: 25px;
    }

    .asd__month-name {
      text-transform: capitalize;
      font-size: $font-size-sm;
      margin: 0 0 24px;
    }

    .asd__day-button {
      font-size: $font-size-xs;
    }

    .compare-select {
      > span {
        color: $secondary;
        letter-spacing: 0.45px;
      }

      > ul {
        margin-top: .35rem;

        > li {
          padding: .20rem 0;
        }
      }
    }
  }

</style>
