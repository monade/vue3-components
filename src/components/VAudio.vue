<template>
  <div class="v-audio-container">
    <div class="v-audio-layer" :class="layerClass">
      <div class="spinner" :style="styleSpinner" v-if="loading">
      </div>
      <div class="progress" :style="styleProgress" v-else>
      </div>
        <button class="btn btn-circle btn-player" :class="btnClass" @click.prevent.stop="togglePlay" :disabled="isBroken">
        <slot name="btn-icon-error" v-if="isBroken">
          <v-icon class="v-audio-icon">broken</v-icon>
        </slot>
        <slot name="btn-icon-play" v-else-if="! playing">
          <span class="audio-icon-correction">
            <v-icon class="v-audio-icon">play</v-icon>
          </span>
        </slot>
        <slot name="btn-icon-pause" v-else>
          <v-icon class="v-audio-icon">stop</v-icon>
        </slot>
        <v-audio-element-wrapper
          ref="audio-wrapper"
          :can-pause="canPause"
          :time-out="1000"
          :sources="sources"
          @error="errorHandler"
          @timeupdate="timeupdateHandler"
          @timedout="timedOutHandler"
          @paused="pausedHandler"
          v-if="sources.length > 0"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, Prop, Component, Vue } from 'vue-property-decorator';
import VAudioElementWrapper from './VAudioElementWrapper.vue';
import VIcon from './VIcon.vue'

@Component({ components: { VAudioElementWrapper, VIcon } })
export default class VAudio extends Vue {
  @Prop({ default: () => [] }) readonly sources!: string[];
  @Prop({ default: () => 1000 }) readonly timeout!: number;
  @Prop({ default: () => false }) readonly canPause!: boolean;
  @Prop({ default: () => '#9FABBC' }) readonly playingColor!: string;
  @Prop({ default: () => 'white' }) readonly contrastColor!: string;

  private loading = false;
  private playing = false;
  private error = false;
  private loaded = 0;
  @Ref('audio-wrapper') readonly audio!: VAudioElementWrapper;

  private timeupdateHandler(event: { progression: number}) {
    if (event) {
      this.loaded = event.progression;
    }
  }

  private errorHandler() {
    this.playing = false;
    this.error = true;
  }

  private timedOutHandler() {
    this.playing = false;
  }

  private pausedHandler() {
    this.playing = false;
  }

  get isBroken() {
    return this.error || this.sources.length === 0;
  }

  get styleProgress() {
    return `background-image: conic-gradient(${this.playingColor} ${this.loaded * 3.6}deg, white 0)`;
  }

  get styleSpinner() {
    return `background: linear-gradient(15deg, ${this.contrastColor} 50%, ${this.playingColor});`;
  }

  get btnClass() {
    if (this.error) {
      return 'btn-outline-secondary btn-error';
    }
    return this.playing ? 'btn-primary' : 'btn-outline-secondary'
  }

  get layerClass() {
    return this.playing ? 'playing' : ''
  }

  protected hasSources(): boolean {
    return this.sources.length > 0;
  }

  protected getAudioElementFromDom(): HTMLAudioElement | null{
    return this.getAudioElementFromDom();
  }

  togglePlay($event: any) {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
    } else {
      this.audio.play();
      this.playing = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';
  .btn-outline-secondary {
    box-shadow: none !important;
    background-color: white;
  }
  .progress {
    position: absolute;
    top: 0.05rem;
    left: 0.05rem;
    width: 2.25rem;
    height: 2.25rem;
    z-index: 5;
    box-shadow: none;
    border-radius: 100%;
    background-color: transparent;
  }

  .spinner {
    background: linear-gradient(15deg, white 50%, #9FABBC);
    position: absolute;
    top: 0.05rem;
    left: 0.05rem;
    width: 2.25rem;
    height: 2.25rem;
    z-index: 5;
    box-shadow: none;
    border-radius: 100%;
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
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
  .playing {
    border-color: $gray-300;
  }

  .v-audio-layer {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    border: 1px solid transparent;
    position: relative;
    background-color: transparent !important;

  }
  .btn-player {
    position: absolute;
    z-index: 8;
    top: .2rem;
    left: .2rem;
  }

  .btn-player.btn-error:hover {
    background-color: transparent;
    border-color: $gray-500;
    color: $gray-500;
  }

  audio {
    width: 0;
    height: 0;
  }
</style>
<style lang="scss">
  .v-audio-container {
    .icon.v-audio-icon {
      > svg {
        width: 10px !important;
        height: 10px !important;
      }
    }
  }
</style>
