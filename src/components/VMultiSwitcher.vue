<template>
  <div class="btn-group btn-group-toggle" data-toggle="buttons" :class="btnGroupClass">
    <label v-for="item of items" :key="item.id" :class="{'btn': true, 'active': item.id == selected, 'disabled': item.disabled}" :for="'switcher-' + item.id" @click="activate(item)">
      <input :id="'switcher-' + item.id" type="radio" :value="false"  name="multi-switcher" :checked="item.id == selected">
      <template v-if="$scopedSlots.item">
        <slot name="item" :value="item"></slot>
      </template>
      <template v-else>
        {{ item.text }}
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import SelectOption from '../models/SelectOption';

@Component
export default class VMultiSwitcher extends Vue {
  @Prop() readonly value!: string|number;
  @Prop() readonly items!: Readonly<Array<SelectOption>>;
  @Prop() readonly size? : string;

  @Watch('value')
  onValueChange(value: string|number) {
    this.selected = value;
  }

  protected selected: string|number = this.value;

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
    this.$emit('input', this.selected);
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
