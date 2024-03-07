<template>
  <div class="btn-group btn-group-toggle" data-toggle="buttons" :class="btnGroupClass">
    <label v-for="item of items" :key="item.id" :class="{'btn': true, 'active': item.id == selected, 'disabled': item.disabled}" :for="'switcher-' + item.id" @click="activate(item)">
      <input :id="'switcher-' + item.id" type="radio" :value="false"  name="multi-switcher" :checked="item.id == selected">
      <template v-if="$slots.item">
        <slot name="item" :value="item"></slot>
      </template>
      <template v-else>
        {{ item.text }}
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-facing-decorator';
import SelectOption from '../models/SelectOption';

@Component({
  emits: ['update:modelValue']
})
export default class VMultiSwitcher extends Vue {
  @Prop() readonly modelValue!: string|number;
  @Prop() readonly items!: Readonly<Array<SelectOption>>;
  @Prop() readonly size? : string;

  @Watch("modelValue")
  onValueChange(value: string|number) {
    this.selected = value;
  }

  selected: string|number = this.modelValue;

  get btnGroupClass() {
    return {
      'btn-group-sm': this.size === 'sm'
    }
  }

  activate(item: SelectOption) {
    if (item.disabled) {
      return;
    }

    this.selected = item.id;
    this.$emit("update:modelValue", this.selected);
  }
}
</script>

<style lang="scss" scoped>
  label {
    &.disabled {
      opacity: .2;
    }
  }
</style>
