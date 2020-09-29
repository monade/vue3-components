<template>
  <div class="v-video-layer">
    <video ref="video" controls controlsList="nodownload" :style="playerStyle">
      <source v-for="(source, idx) in sources" v-bind:key="idx" :src="source"/>
    </video>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';

@Component({ })
export default class VVideo extends Vue {
  @Prop({ default: () => [] }) sources!: string[];
  @Prop({ default: () => '100%' }) width!: string;
  @Ref() video!: HTMLVideoElement;

  mounted() {
    // start loading video
    this.video.load();
  }

  get playerStyle() {
    return `width: ${this.width}`;
  }

  play() {
    this.video.focus();
    this.video.play();
  }

  pause() {
    this.video.pause();
  }
}
</script>
