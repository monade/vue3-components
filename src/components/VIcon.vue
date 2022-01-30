<template>
  <span class="icon" :class="{ 'spin': spin }" v-html="getSvg()"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class VIcon extends Vue {
  @Prop({ default: false }) readonly spin!: boolean;

  getIcon() {
    return this.$slots.default && this.$slots.default.length ? this.$slots.default[0].text : null;
  }

  getSvg() {
    return this.getIcon() ? require(`!svg-inline-loader!../assets/icons/${this.getIcon()}.svg`) : null;
  }
}
</script>

<style lang="scss">
  .icon {
    color: inherit;

    > svg {

      height: 1em;
      width: 1em;
      font-size: inherit;

      * {
        opacity: 1;
      }

      path, rect {
        fill: currentColor;
        stroke: none;
      }

      line {
        stroke: currentColor;
      }
    }

    &.spin {
      > svg {
        animation-name: spin;
        animation-duration: 750ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
  }

  @-ms-keyframes spin {
      from { -ms-transform: rotate(0deg); }
      to { -ms-transform: rotate(360deg); }
  }
  @-moz-keyframes spin {
      from { -moz-transform: rotate(0deg); }
      to { -moz-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
      from { -webkit-transform: rotate(0deg); }
      to { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }
</style>
