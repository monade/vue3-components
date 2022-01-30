<template>
  <span class="timepicker d-flex align-items-center">
    <v-number-picker v-model="hours" :max="23" :digits="2" :loop="true" />
    <span class="timepicker__divider">:</span>
    <v-number-picker v-model="minutes" :max="30" :step="30" :digits="2" :loop="true" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VNumberPicker from './VNumberPicker.vue';

export const TIME_FORMAT = 'HH:mm';

@Component({
  components: {
    VNumberPicker
  }
})
export default class VTimePicker extends Vue {
  @Prop({ default: '00:00' }) readonly value!: string;

  @Watch('value')
  onValueChange(value: string) {
    this.updateHoursAndMinutes(value);
  }

  @Watch('time')
  onTimeChange(value: string) {
    this.$emit('input', value);
  }

  hours = 0;
  minutes = 0;

  created() {
    this.updateHoursAndMinutes(this.value);
  }

  get time(): string {
    const time = this.$moment();
    time.hours(this.hours);
    time.minutes(this.minutes);

    return time.format(TIME_FORMAT);
  }

  updateHoursAndMinutes(value: string) {
    const time = value || '00:00';
    const date = this.$moment(time, TIME_FORMAT);

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
