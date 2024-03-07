<template>
  <div>FIXME</div>
  <!-- <vue-numeric
    ref="edit"
    :decimal-separator="decimalSeparator"
    :thousand-separator="thousandSeparator"
    :currency="currency"
    :precision="precision"
    :read-only="readOnly"
    :modelValue="inserted"
    :currency-symbol-position="symbolPosition"
    :min="min"
    :max="max"
    :minus="hasNegative"
    @update:modelValue="onValueChanged"
    @blur="$emit('blur')"
    class="form-control"
  ></vue-numeric> -->
</template>
<script lang="ts">
// import VueNumeric from "@robin-rossow/vue-input-number";
import { Component, Prop, Vue, Ref } from "vue-facing-decorator";

export enum VNumericInputApplication {
  BASE,
  PERCENT,
  CURRENCY,
}

@Component({
  components: { /*VueNumeric*/ },
  emits: ["update:modelValue", "formatted-input", "blur"],
})
export default class VNumericInput extends Vue {
  @Prop({
    default: () => {
      return VNumericInputApplication.BASE;
    }
  })
  readonly usage!: VNumericInputApplication;

  @Prop({ default: "$" }) readonly currencySign!: string;
  @Prop({ default: "%" }) readonly percentSign!: string;
  @Prop({ default: "," }) readonly thousandSeparator!: string;
  @Prop({ default: "." }) readonly decimalSeparator!: string;
  @Prop({ default: 2 }) readonly precision!: number;
  @Prop({ default: false }) readonly hasNegative!: boolean;
  @Prop({ default: false }) readonly readOnly!: boolean;
  @Prop({ default: 0 }) readonly modelValue!: number;

  @Prop({ default: Number.MIN_SAFE_INTEGER }) min!: number;
  @Prop({ default: Number.MAX_SAFE_INTEGER }) max!: number;

  @Ref("edit") edit: any;

  inserted = 0;

  mounted() {
    this.inserted = this.modelValue;
  }

  get currency() {
    if (this.usage === VNumericInputApplication.PERCENT) {
      return this.percentSign;
    } else if (this.usage === VNumericInputApplication.CURRENCY) {
      return this.currencySign;
    }
    return "";
  }

  get symbolPosition() {
    if (this.usage === VNumericInputApplication.PERCENT) {
      return "suffix";
    }
    return "";
  }

  onValueChanged(value: number, oldValue: number) {
    this.inserted = value;
    this.notifyNewValue(value);
  }

  notifyNewValue(value: number) {
    this.notifyEvent("update:modelValue", value);
    const formattedNumericValue = value.toFixed(this.precision);
    const formattedString = this.isSuffix
      ? `${value.toFixed(this.precision)} ${this.currencySign} `
      : `${this.currencySign} ${value.toFixed(this.precision)}`;
    this.notifyEvent("formatted-input", formattedString);
  }

  get isSuffix() {
    return this.symbolPosition === "suffix";
  }

  notifyEvent<T>(name: string, value: T | null = null) {
    if (value !== null) {
      this.$emit(name, value);
    } else {
      this.$emit(name);
    }
  }
}
</script>
