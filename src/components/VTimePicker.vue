<template>
  <span class="timepicker d-flex align-items-center">
    <v-number-picker v-model="hours" :max="23" :digits="2" :loop="true" />
    <span class="timepicker__divider">:</span>
    <v-number-picker v-model="minutes" :max="30" :step="30" :digits="2" :loop="true" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-facing-decorator';
import VNumberPicker from './VNumberPicker.vue';
import moment from 'moment';

export const TIME_FORMAT = 'HH:mm';

@Component({
  components: {
    VNumberPicker
  },
  emits: ['update:modelValue']
})
export default class VTimePicker extends Vue {
  @Prop({ default: '00:00' }) readonly modelValue!: string;

  @Watch("modelValue")
  onValueChange(value: string) {
    this.updateHoursAndMinutes(value);
  }

  @Watch('time')
  onTimeChange(value: string) {
    this.$emit("update:modelValue", value);
  }

  hours = 0;
  minutes = 0;

  created() {
    this.updateHoursAndMinutes(this.modelValue);
  }

  get time(): string {
    const time = moment();
    time.hours(this.hours);
    time.minutes(this.minutes);

    return time.format(TIME_FORMAT);
  }

  updateHoursAndMinutes(value: string) {
    const time = value || '00:00';
    const date = moment(time, TIME_FORMAT);

    this.hours = date.hours();
    this.minutes = date.minutes();
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';

  .timepicker {
    font-size: $font-size-sm;

    &__divider {
      padding: 0 3px;
    }
  }
</style>
