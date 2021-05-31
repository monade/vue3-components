<template>
  <div
    class="position-absolute h-100 d-flex w-100 overlay"
    :style="{ 'z-index': 10 }"
  >
    <fa-icon
      icon="circle-notch"
      :size="notchSize"
      class="m-auto"
      :class="notchClass"
      :style="notchStyle"
      spin
    ></fa-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class VContentLoading extends Vue {
  @Prop({ default: "3x" })
  readonly notchSize!: string;

  @Prop({ default: "#00ff00" })
  readonly notchColor!: string;

  @Prop({ default: "" })
  readonly notchClass!: string;

  get notchStyle() {
    return { color: this.notchColor };
  }
}
</script>

<style lang="scss">
@import "../css/vue";
.overlay {
  background: rgba($mineshaft-2, 0.7);
}
</style>
