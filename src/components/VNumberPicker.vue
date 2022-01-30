<template>
  <span class="v-number-picker">
    <span class="v-number-picker__button" @click="up">
      <v-icon>chevron-up</v-icon>
    </span>
    <div class="v-number-picker__value">{{ number|number(0, digits) }}</div>
    <span class="v-number-picker__button v-number-picker__button--down" @click="down">
      <v-icon>chevron-up</v-icon>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VIcon from './VIcon.vue';
import Number from '../filters/Number';

@Component({ components: { VIcon }, filters: { Number } })
export default class VNumberPicker extends Vue {
  @Prop() readonly value!: number;
  @Prop({ default: 1 }) readonly step!: number;
  @Prop({ default: 0 }) readonly min!: number;
  @Prop({ default: null }) readonly max!: number|null;
  @Prop({ default: false }) readonly loop!: boolean;
  @Prop({ default: 1 }) readonly digits? : number|null;

  number = 0;

  @Watch('value')
  onValueChange(value: number) {
    this.number = value;
  }

  created() {
    this.number = this.value;
  }

  up() {
    if (this.step) {
      const number = this.number + this.step;

      if ((this.max != null && this.max >= number) || this.max === null) {
        this.number = number;
      } else if (this.min != null && this.loop) {
        this.number = this.min;
      }

      this.$emit('input', this.number);
    }
  }

  down() {
    if (this.step) {
      const number = this.number - this.step;

      if ((this.min != null && this.min <= number) || this.min === null) {
        this.number = number;
        this.$emit('input', this.number);
      } else if (this.max != null && this.loop) {
        this.number = this.max;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';
  $v-number-picker-size: 20px;
  $v-number-picker-icon-size: 8px;

  .v-number-picker {
    display: inline-block;
    user-select: none;

    &__value {
      width: $v-number-picker-size;
      height: $v-number-picker-size;
      line-height: $v-number-picker-size;
      text-align: center;
      font-size: $font-size-xs;
      color: $white;
      background-color: $primary;
    }

    &__button {
      text-align: center;
      display: block;
      cursor: pointer;
      font-size: $v-number-picker-icon-size;
      color: $secondary;

      &--down {
        transform: rotate(180deg);
      }

      &:hover {
        color: $black;
      }
    }
  }
</style>
