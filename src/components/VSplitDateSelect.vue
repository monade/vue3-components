<template>
  <div class="v-split-date-select form-group d-flex">
    <select :required="required" v-model="day" class="form-control v-split-date-select__day" :class="{ 'select-placeholder': day === null }">
      <option :value="null">Giorno</option>
      <option v-for="day in days" :key="day.id" :value="day.id">{{ day.label }}</option>
    </select>
    <select :required="required" v-model="month" class="form-control v-split-date-select__month" :class="{ 'select-placeholder': month === null }">
      <option :value="null">Mese</option>
      <option v-for="month in months" :key="month.id" :value="month.id">{{ month.label }}</option>
    </select>
    <select :required="required" v-model="year" class="form-control v-split-date-select__year" :class="{ 'select-placeholder': year === null }">
      <option :value="null">Anno</option>
      <option v-for="year in years" :key="year.id" :value="year.id">{{ year.label }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class VSplitDateSelect extends Vue {
  @Prop() value!: string | undefined;
  @Prop({ default: () => 'YYYY-MM-DD' }) dateFormat!: string;
  @Prop({ default: () => moment('1900-01-01').toDate() }) minDate!: Date;
  @Prop({ default: () => new Date() }) maxDate!: Date;
  @Prop({ default: false }) required!: boolean;
  private currentDate = this.value ? moment(this.value) : null;

  private day: number | null = this.currentDate?.date() ?? null;
  private month: number | null = this.currentDate?.month() ?? null;
  private year: number | null = this.currentDate?.year() ?? null;

  get years() {
    const maxDate = moment(this.maxDate);
    const minDate = moment(this.minDate);
    const output: { id: number; label: number }[] = [];

    for (let i = maxDate.year(); i >= minDate.year(); i--) {
      output.push({ id: i, label: i });
    }
    return output;
  }

  get months() {
    const months = moment.months().map((e, index) => { return { label: e, id: index } });
    if (this.year === this.maxDate.getFullYear()) {
      return months.filter(e => e.id <= this.maxDate.getMonth())
    }
    if (this.year === this.minDate.getFullYear()) {
      return months.filter(e => e.id >= this.minDate.getMonth())
    }
    return months;
  }

  get days() {
    let count;
    if (this.month === null) {
      count = moment(new Date(2018, 0, 1)).daysInMonth();
    } else if (this.year === null) {
      count = moment(new Date(2018, this.month, 1)).daysInMonth();
    } else {
      count = moment(new Date(this.year, this.month, 1)).daysInMonth();
    }
    const days = new Array(count).fill(undefined).map((_, index) => { return { id: index + 1, label: index + 1 } });

    if (this.year === this.maxDate.getFullYear() && this.month === this.maxDate.getMonth()) {
      const maxDate = moment(this.maxDate);
      return days.filter(e => e.id <= maxDate.date());
    }

    if (this.year === this.minDate.getFullYear() && this.month === this.minDate.getMonth()) {
      const minDate = moment(this.minDate);
      return days.filter(e => e.id >= minDate.date());
    }

    return days;
  }

  @Watch('day')
  onDayChanged() {
    this.updateValue();
  }

  @Watch('month')
  onMonthChanged() {
    this.validateDay();
    this.updateValue();
  }

  @Watch('year')
  onYearChanged() {
    this.validateDay();
    this.updateValue();
  }

  validateDay() {
    if (!this.days.find(e => e.id === this.day)) {
      this.day = null;
    }
    if (!this.months.find(e => e.id === this.month)) {
      this.month = null;
    }
  }

  updateValue() {
    if (this.year === null) {
      return;
    }
    if (this.month === null) {
      return;
    }
    if (this.day === null) {
      if (this.currentDate) {
        this.$emit('input', null)
      }
      return;
    }
    this.currentDate = moment({ day: this.day, month: this.month, year: this.year });

    this.$emit('input', this.currentDate.format(this.dateFormat))
  }
}

</script>

<style scoped lang="scss">
.v-split-date-select {
  &__month {
    text-transform: capitalize;
  }
}
</style>
