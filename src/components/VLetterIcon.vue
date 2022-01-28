<template>
  <span class="v-letter-icon" :style="style">
    <span class="v-letter-icon__letter">{{ letter() }}</span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ColorHelper, { ColorsInterface } from '../services/ColorHelper';

@Component
export default class VLetterIcon extends Vue {
  @Prop() readonly color? : string|number;
  @Prop() readonly colors? : ColorsInterface;

  created() {
    if (this.colors !== undefined) {
      ColorHelper.colors = this.colors;
    }
  }

  letter(): string {
    const value = this.$slots.default && this.$slots.default.length ? this.$slots.default[0].text : '';

    if (value) {
      return value.charAt(0).toUpperCase();
    } else {
      return '';
    }
  }

  get style() {
    let color = '';

    if (this.color) {
      color = typeof this.color === 'string' ? this.color : ColorHelper.colorAtIndex(this.color as number);
    } else {
      color = ColorHelper.random();
    }

    return {
      backgroundColor: color || ''
    };
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';

  .v-letter-icon {
    width: $image-icon-width;
    height: $image-icon-height;
    border: 1px solid $border-color;
    border-radius: $image-icon-radius;
    background-color: $red;
    display: inline-block;
    position: relative;

    &__letter {
      font-size: 17px;
      line-height: 17px;
      color: $white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
