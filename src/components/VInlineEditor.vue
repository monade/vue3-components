<template>
  <div v-click-outside="disableEditing">
    <template v-if="!disabled && (inputOnly || editing || !data)">
      <textarea
        v-if="textArea"
        v-model="data"
        :maxLength="maxLength"
        :class="classes"
        @click.stop="enableEditing"
        :placeholder="placeholder"
        resize="none"
        @blur="onSave"
      ></textarea>
      <input
        v-else
        :maxLength="maxLength"
        @click.stop="enableEditing"
        v-model="data"
        :style="inputStyle"
        :type="type"
        :class="classes"
        :placeholder="placeholder"
        @blur="onSave"
      />
    </template>
    <template v-else>
      <p
        @click.stop="enableEditing"
        :class="classes"
        :style="inputStyle"
        class="m-0 white-space-pre"
      >{{printedData}}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { NestedDictionary } from '../models/NestedDictionary';
import { renderNestedParams } from '../utils/renderNestedParams';

import ClickOutside from '../directives/ClickOutside';

export interface DataFormatter {
  fromString(value: string): any;
  toString(value: any): string;
}
class NullDataFormatter implements DataFormatter {
  fromString(v: string) { return v; }
  toString(v: string) { return v; }
}

@Component({
  directives: {
    ClickOutside
  }
})
export default class VInlineEditor extends Vue {
  @Prop() readonly value!: string | NestedDictionary;
  @Prop({ default: '' }) readonly suffix!: string;
  @Prop({ default: 'text' }) readonly type!: 'number' | 'text' | 'password' | 'email';
  @Prop() readonly placeholder!: string;
  @Prop() readonly maxLength!: number;
  @Prop() readonly uppercase!: boolean;
  @Prop({ default: '' }) readonly inputClasses!: string;
  @Prop({ default: false }) readonly textArea!: boolean;
  @Prop() readonly dataKeys?: string[];
  @Prop({ default: false }) readonly inputOnly!: boolean;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop() readonly regExp?: RegExp;
  @Prop({ default: () => new NullDataFormatter() }) readonly formatter!: DataFormatter;

  data = this.value || null;
  editing = false;
  changed = false;
  matchesRegExp = true;

  mounted() {
    this.editing = !this.data;
  }

  get printedData() {
    if (this.data) {
      return `${this.formatter.toString(this.data)} ${this.suffix}`;
    } else {
      return '-';
    }
  }

  get classes() {
    return [this.inputClasses, this.matchesRegExp ? '' : 'text-danger', !this.disabled ? '' : 'input-disabled'];
  }

  @Watch('value')
  onValueChanged(value: any, oldValue: any) {
    if (this.uppercase && value) value.toUpperCase();
    this.data = value;
  }

  @Watch('data')
  onDataChanged(val: any, oldVal: any) {
    if (val !== oldVal) {
      this.validateRegExp();
      this.changed = true;
    }
  }

  get inputStyle() {
    const data: { [key: string]: string } = {};
    if (this.uppercase) {
      data['text-transform'] = 'uppercase';
    }

    return data;
  }

  get outputParams() {
    return renderNestedParams(this.dataKeys, this.data);
  }

  private enableEditing() {
    this.editing = true;
  }

  private disableEditing() {
    this.editing = false;
  }

  validateRegExp() {
    this.matchesRegExp = this.regExp && typeof this.data === 'string' ? this.regExp.test(this.data) : true;
  }

  onSave() {
    if (this.uppercase && this.data && typeof this.data === 'string') {
      this.data = this.data.toUpperCase();
    }
    if (this.changed && (this.matchesRegExp || !this.data)) {
      this.$emit('change', this.outputParams);
    }
    this.editing = false;
    this.changed = false;
  }
}
</script>

<style scoped lang="scss">
.fa {
  cursor: pointer;
}

.input-value {
  border-bottom: solid 1px transparent !important;
}

.white-space-pre {
  white-space: pre-line;
}

.input-disabled:hover {
  border-bottom: solid 1px transparent !important;
}

::-webkit-input-placeholder { /* WebKit browsers */
    text-transform: none;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    text-transform: none;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    text-transform: none;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    text-transform: none;
}
::placeholder { /* Recent browsers */
    text-transform: none;
}
</style>
