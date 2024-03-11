<template>
  <div class="custom-control custom-checkbox">
    <input
      type="checkbox"
      class="custom-control-input"
      :id="id"
      :value="checkboxValue"
      v-model="selected"
      @change="onChange"
      :disabled="disabled"
    />
    <label class="custom-control-label" :for="id" v-if="$slots.default?.()"
      ><slot></slot>
    </label>
     <label class="custom-control-label" :for="id" v-else
      >{{label}}
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-facing-decorator";

@Component({
  emits: ["update:modelValue"]
})
export default class VCheckbox extends Vue {
  @Prop() readonly modelValue!: boolean;
  @Prop() readonly label!: string;
  @Prop() readonly inputValue?: string | null;
  @Prop({ default: false }) readonly disabled?: boolean;

  @Watch("modelValue")
  onValueChange(value: boolean) {
    this.selected = value;
  }

  selected: boolean = this.modelValue || !!null;

  get id() {
    return "checkbox-" + this.randomValue();
  }

  get checkboxValue() {
    return this.inputValue ? this.inputValue : this.$slots.default?.();
  }

  randomValue() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }

  onChange() {
    this.$emit("update:modelValue", this.selected);
  }
}
</script>

<style lang="scss" scoped>
label {
  user-select: none;
}

.custom-checkbox {
  cursor: pointer;
  .custom-control-label {
    font-size: 0.6875rem;

    &:before, &:after {
      top: 0;
    }
  }
}
</style>
