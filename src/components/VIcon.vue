<template>
  <span @click="$emit('click', $event)" class="icon" :class="{ 'spin': spin }" v-html="svgIcon"></span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';

@Component({
  emits: ['click']
})
export default class VIcon extends Vue {
  @Prop({ default: false }) readonly spin!: boolean;
  svgIcon: string | null = null

  async mounted() {
    this.svgIcon = await this.getSvg()
  }

  getIcon() {
    const slotChild = this.$slots.default?.()?.[0]?.children
    if (!slotChild) {
      return null
    }

    return typeof slotChild === 'string' ? slotChild.trim() : null
  }


  getSvg() {
    const name = this.getIcon()
    if (!name) {
      return null
    }
    return import(`../assets/icons/${name}.svg?raw&inline`).then((e) => e.default)
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
