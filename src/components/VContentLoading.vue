<template>
  <div class="position-absolute h-100 d-flex w-100 overlay" :style="{'z-index': 10 }" v-if="true">
    <fa-icon icon="circle-notch" :size="notchSize" class="m-auto text-primary" spin></fa-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class VContentLoading extends Vue {
  @Prop({ default: '3x' })
  notchSize!: string;
}
</script>

<style lang="scss">
@import '../css/vue';
.overlay {
  background: rgba($mineshaft-2, 0.7);
}

</style>
