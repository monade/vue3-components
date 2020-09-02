<template>
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" :id="id" :value="checkboxValue" v-model="selected" @change="onChange" :disabled="disabled" />
    <label class="custom-control-label" :for="id" v-if="label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class VCheckbox extends Vue {
  @Prop({ required: true }) value!: boolean | any[];
  @Prop() label?: string;
  @Prop() inputValue: any;
  @Prop({ default: false }) disabled!: boolean;

  private selected = this.value;

  get id() {
    return 'checkbox-' + this.randomValue();
  }

  get checkboxValue() {
    return this.inputValue ? this.inputValue : this.label;
  }

  @Watch('value')
  onValueChanged(value: boolean | any[]) {
    this.selected = value;
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
