<template>
  <span class="v-switch-button-wrapper" @click="toggle">
    <span class="v-switch-button" :class="buttonClass"></span>
    <span class="v-switch-button__label" v-if="$slots.default"><slot></slot></span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class VSwitchButton extends Vue {
  @Prop({ default: false }) readonly value!: boolean;

  @Watch('value')
  onValueChange(value: boolean) {
    this.selected = value;
  }

  selected = this.value;

  get buttonClass() {
    return {
      'v-switch-button--selected': this.selected
    };
  }

  toggle() {
    this.selected = !this.selected;
    this.$emit('input', this.selected);
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';

  $switch-width: 28px;
  $switch-height: 14px;

  .v-switch-button-wrapper {
    display: flex;
    align-items: center;
  }

  .v-switch-button {
    display: inline-block;
    position: relative;

    width: $switch-width;
    height: $switch-height;

    border-radius: $switch-height / 2;
    background-color: $gray-300;

    cursor: pointer;
    @extend %user-select-none;

    &:before {
      display: block;
      position: absolute;
      content: '';

      width: $switch-height;
      height: $switch-height;
      background-color: $white;
      border-radius: $switch-height / 2;
      border: 1px solid $gray-300;
      box-shadow: 0px 1px 3px $gray-400;

      left: 0;
      top: 0;

      transition: all .250s;
    }

    &--selected {
      background-color: $primary;

      &:before {
        transform: translateX(100%);
      }
    }

    &__label {
      font-size: $font-size-sm;
      color: $secondary;
      letter-spacing: 0.22px;
      margin-left: 10px;
      @extend %user-select-none;
    }
  }
</style>
