<template>
  <div>
    <div
      :class="inputClasses"
      class="form-date d-flex align-items-center"
      @keyup.capture="updateValue"
    >
      <input
        ref="day"
        v-model="day"
        class="form-date__input form-date__input--day"
        :class="{'text-danger': error}"
        type="number"
        placeholder="DD"
        @click="selected = 'day'"
        @input="updateDay"
      />
      <span class="form-date__divider">/</span>
      <input
        ref="month"
        v-model="month"
        :class="{'text-danger': error}"
        @click="selected = 'month'"
        class="form-date__input form-date__input--month"
        type="number"
        placeholder="MM"
        @input="updateMonth"
      />
      <span class="form-date__divider">/</span>
      <input
        ref="year"
        v-model="year"
        :class="{'text-danger': error}"
        @click="selected = 'year'"
        class="form-date__input form-date__input--year"
        type="number"
        placeholder="YYYY"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import { ARROW_RIGHT, ARROW_LEFT, ENTER } from '@/utils/KeyboardHelper';
import VDatePicker from '@/components/VDatePicker.vue';
import Throttler from '@/utils/Throttler';
import moment from 'moment';

const MAX_MONTH = 12;
const MAX_DAY = 31;
const MIN_VALUE = 1;

@Component({ components: { VDatePicker } })
export default class VInlineDateInput extends Vue {
  @Prop() readonly value!: number ;
  @Prop() readonly inputClasses!: string;
  @Ref('airbnbDatePicker') readonly datePicker: any;

  private throttler: Throttler = new Throttler();

  private day: string|null = null;
  private month: string|null = null;
  private year: string|null = null;
  private error = false;
  private selected = 'day';

  subscription: any = null;

  created() {
    this.day = `${
      this.value ? new Date(this.value).getDate() : new Date().getDate()
    }`;
    this.month = `${
      this.value ? new Date(this.value).getMonth() + 1 : new Date().getMonth()
    }`;
    this.year = `${
      this.value ? new Date(this.value).getFullYear() : new Date().getFullYear()
    }`;
  }

  mounted() {
    this.subscribe();
    this.updateDay();
    this.updateMonth();
  }

  @Watch('value')
  onDateChanged(data: string) {
    this.updateValues(data);
  }

  updateValues(data: string) {
    this.day = `${
      this.value ? new Date(this.value).getDate() : new Date().getDate()
    }`;

    this.month = `${
      this.value ? new Date(this.value).getMonth() + 1 : new Date().getMonth()
    }`;

    this.year = `${
      this.value ? new Date(this.value).getFullYear() : new Date().getFullYear()
    }`;
  }

  unsuscribe() {
    this.subscription();
  }

  subscribe() {
    this.subscription = window.addEventListener('keydown', (e) => {
      if (e.key === ARROW_RIGHT) {
        this.onRightArrowPressed();
      } else if (e.key === ARROW_LEFT) {
        this.onLeftArrowPressed();
      } else if (e.key === ENTER) {
        this.updateValue();
        this.$emit('blur');
      }
    });
  }

  onLeftArrowPressed() {
    switch (this.selected) {
      case 'day':
        break;
      case 'month':
        this.selectItem('day');
        break;
      case 'year':
        this.selectItem('month');
        break;
    }
  }

  onRightArrowPressed() {
    switch (this.selected) {
      case 'day':
        this.selectItem('month');
        break;
      case 'month':
        this.selectItem('year');
        break;
      case 'year':
        break;
    }
  }

  selectItem(value: string) {
    if (this.$refs[value]) {
      (this.$refs[value] as any).select();
      this.selected = value;
    }
  }

  updateDay() {
    if (!this.day) {
      return;
    }
    const dayValue = parseInt(this.day);
    if (dayValue < 1) {
      this.day = MIN_VALUE.toString();
    }
    const value = Math.min(MAX_DAY, parseInt(this.day));
    this.day = value.toString();
  }

  updateMonth() {
    if (!this.month) {
      return;
    }
    const monthValue = parseInt(this.month);
    if (monthValue < 1) {
      this.month = MIN_VALUE.toString();
    }
    const value = Math.min(MAX_MONTH, parseInt(this.month));
    this.month = value.toString();
  }

  updateValue() {
    if (!this.day || !this.month || !this.year) {
      return;
    }
    const string = `${this.day!.padStart(2, '0')}/${this.month.padStart(
      2,
      '0'
    )}/${this.year.padStart(4, '0')}`;
    const date = moment(string, 'DD/MM/YYYY').toDate();
    this.error = date.toString() === 'Invalid Date'

    const timestamp = date.getTime();
    if (Number.isNaN(timestamp)) {
      return;
    }
    if (!this.error && date.toString() !== 'Invalid Date') {
      this.$emit('input', timestamp);
    }
  }

  @Watch('year')
  onYearChanged(current: string, prev: string) {
    if (parseInt(current) > 9999) {
      this.year = prev;
    }
  }
}
</script>

<style lang="scss" scoped>
.form-date {
  $spacing: 0.5em;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  border-radius: 0.25em;
  // 1. Hide the spinner button in Chrome, Safari and Firefox.
  &__input {
    border: none;
    background-color: transparent;
    text-align: center;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-appearance: textfield; // 1
    &::-webkit-inner-spin-button {
      display: none; // 1
    }

    &:last-child {
      padding-right: $spacing;
    }
    &:focus {
      outline: none;
    }
    &--day,
    &--month {
      width: 1.8em;
    }
    &--year {
      width: 4em;
    }
  }
  &__divider {
    pointer-events: none;
  }
}
</style>
