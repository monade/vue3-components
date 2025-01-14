<template>
  <div
    class="position-absolute h-100 d-flex w-100"

    :class="{overlay: hasOverlay}"
    :style="overlayStyle"
  >
    <v-icon
      class="m-auto"
      :class="[notchClass, sizeClass]"
      :spin="true"
      :style="notchStyle"
    >spinner</v-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";
import VIcon from "./VIcon.vue";

const SIZES = {
  "3x": "icon-3x",
  "2x": "icon-2x",
  "1x": "icon-1x"
};

export interface ContentLoadingConfig {
  notch: {
    size: "3x" | "2x" | "1x";
    color: string;
    class: any;
  };
  overlay: {
    show: boolean;
    opacity: number;
    color: string;
    class: string;
  };
}
@Component({
  components: { VIcon }
})
export default class VContentLoading extends Vue {
  @Prop()
  readonly config?: ContentLoadingConfig;

  @Prop({ default: "3x" })
  readonly size!: '3x' | '2x' | '1x';

  get configuration(): ContentLoadingConfig {
    return this.config || this.defaultConfig;
  }

  get notchStyle() {
    return {
      color: this.config?.notch?.color || this.defaultConfig?.notch?.color,
    };
  }

  get overlayStyle() {
    return { background: this.overlayColor, 'z-index': 10, opacity: this.overlayOpacity };
  }

  get overlayOpacity() {
    return this.config?.overlay?.opacity || this.defaultConfig?.overlay?.opacity
  }

  get overlayColor() {
    return this.config?.overlay?.color || this.defaultConfig?.overlay?.color
  }

  get notchClass() {
    return this.config?.notch?.class || this.defaultConfig?.notch?.class
  }

  get hasOverlay() {
    return this.config?.overlay?.show ?? this.defaultConfig?.overlay?.show;
  }

  get sizeClass() {
    return SIZES[this.size] ?? SIZES["3x"];
  }

  get defaultConfig(): ContentLoadingConfig {
    return {
      notch: { size: "3x", color: "red", class: "" },
      overlay: {
        show: true,
        color: "black",
        opacity: 0.6,
        class: ""
      }
    };
  }
}
</script>

<style lang="scss">
@import "../css/vue";

.icon-3x {
  font-size: 3em;
}

.icon-2x {
  font-size: 2em;
}

.icon-1x {
  font-size: 1em;
}

</style>
