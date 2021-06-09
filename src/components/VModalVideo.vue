<template>
  <v-modal :size="size" class="modal-video" ref="modal" @hidden="onHidden" @shown="onShow">
    <template slot="header">
      <h3 class="font-weight-bold">{{ title }}</h3>
    </template>

    <v-video ref="video" :sources="sources" width='100%' v-if="isShowing"/>
  </v-modal>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import VModal from '@/components/VModal.vue';
import VVideo from '@/components/VVideo.vue';

@Component({ components: { VModal, VVideo } })
export default class VModalVideo extends Vue {
  @Prop({ default: () => [] }) sources!: string[];
  @Prop({ default: () => '' }) title!: string;
  @Prop({ default: 'modal-lg' }) size? : string;
  @Prop({ default: false }) autostart!: boolean;
  @Ref() modal!: VModal;
  @Ref() video!: VVideo;

  isShowing = false;

  onHidden() {
    this.isShowing = false;
    this.video.pause();
    this.$emit('hidden');
  }

  onShow() {
    this.isShowing = true;
    if (this.autostart) {
      this.$nextTick(() => this.video.play());
    }
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }
}
</script>
