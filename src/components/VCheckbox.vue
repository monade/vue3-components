<template>
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" :id="id" :value="checkboxValue" v-model="selected" @change="onChange" :disabled="disabled" />
    <label class="custom-control-label" :for="id" v-if="$slots.default"><slot></slot></label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class VCheckbox extends Vue {
  @Prop({ default: false }) readonly value!: boolean;
  @Prop() readonly inputValue?: string|null;
  @Prop({ default: false }) readonly disabled!: boolean;

  @Watch('value')
  onValueChange(value: boolean) {
    this.selected = value;
  }

  protected selected: boolean = this.value;

  get id() {
    return 'checkbox-' + this.randomValue();
  }

  get checkboxValue() {
    return this.inputValue ? this.inputValue : this.$slots.default;
  }

  randomValue() {
    return Math.random().toString(36).substr(2, 9);
  }

  onChange() {
    this.$emit('input', this.selected);
  }
}
</script>

<style lang="scss" scoped>

  label {
    user-select: none;
  }
</style>
