<template>
  <div class="dropdown" v-click-outside="closeDropdown">
    <div class="d-flex h-100">
      <div class="my-auto clickable ml-3 h-100" @click="open=!open">
        <div class="color-indicator" :style="{background: color}"></div>
      </div>
    </div>
    <div
      class="dropdown-menu dropdown-menu-left px-4"
      :class="{show: open}"
      aria-labelledby="navbarDropdown"
    >
      <div class="row mb-2" v-for="(chunk, index) in colorChunks" :key="index">
        <div class="col p-0" v-for="chunkColor in chunk" :key="chunkColor">
          <div class="color-picker-indicator mx-auto clickable d-flex" :style="{background: chunkColor}" @click="onColorClick(chunkColor)">
            <v-icon class="m-auto icon icon-white" size="xs" v-if="color==chunkColor">check</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { chunkArrayInGroups } from '../utils/chunkArrayInGroups';
import ClickOutside from '../directives/ClickOutside';
import VIcon from './VIcon.vue';

@Component({
  directives: {
    ClickOutside
  },
  components: {
    VIcon
  }
})
export default class VColorPicker extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  })
  readonly colors!: string[];

  @Prop({ default: 1 })
  readonly columns!: number;

  open = false;

  closeDropdown() {
    this.open = false;
  }

  onColorClick(color: string) {
    this.$emit('change', color);
  }

  @Prop()
  color!: string[];

  get colorChunks() {
    return chunkArrayInGroups(this.colors, this.columns);
  }
}
</script>

<style scoped>
.color-indicator {
  width: 13px;
  height: 13px;
  border-radius: 100%;
}
.color-picker-indicator {
  width: 23px;
  height: 23px;
  border-radius: 100%;
}
.icon{
  height: 23px;
}
</style>
