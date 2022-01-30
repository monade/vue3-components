<template>
  <span class="v-check-button-wrapper" @click="toggle">
    <span class="v-check-button" :class="buttonClass">
      <v-icon v-show="checked">check</v-icon>
    </span>
    <span class="v-check-button__label" v-if="$slots.default"><slot></slot></span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VIcon from './VIcon.vue';

@Component({ components: { VIcon } })
export default class VCheckButton extends Vue {
  @Prop() readonly value!: boolean;
  @Prop({ default: false }) readonly disableUncheck? : boolean;

  @Watch('value', { deep: true })
  onValueChange(value: boolean) {
    this.checked = value;
  }

  checked = this.value;

  get buttonClass() {
    return {
      'v-check-button--checked': this.checked
    };
  }

  toggle() {
    if (this.disableUncheck) {
      if (!this.checked) {
        this.checked = true;
      }
    } else {
      this.checked = !this.checked;
    }

    this.$emit('input', this.checked);
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';

  $check-width: 15px;
  $check-height: 15px;

  .v-check-button-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .v-check-button {
    display: inline-block;
    position: relative;

    width: $check-width;
    height: $check-height;

    border-radius: $check-height / 2;
    background-color: $white;
    border: 1px solid $border-color;
    color: $white;
    font-size: 13px;
    line-height: 13px;

    @extend %user-select-none;

    &--checked {
      background-color: $primary;
      border-color: $primary;
    }

    &__label {
      font-size: $font-size-sm;
      letter-spacing: 0.22px;
      margin-left: 6px;
      @extend %user-select-none;
    }

    .icon {
      @include center();
    }
  }
</style>
