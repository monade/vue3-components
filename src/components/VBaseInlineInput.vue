<template>
  <div>
    <div class="d-flex">
      <p v-if="label" class="my-auto mr-2">{{ label }}</p>
      <template v-if="open">
        <div v-if="isNumeric">
          <v-numeric-input
            @input="onNumericValueChanged"
            :value="data"
            @blur="onBlur"
            currency-sign="€"
            :usage="numericType"
            :readOnly="false"
            :has-negative="false"
          ></v-numeric-input>
        </div>
        <div
          v-else-if="isText || isTextArea"
          :class="{ 'w-100': fullWidthEditor }"
        >
          <v-inline-editor
            :ref="textEditorRef"
            :textArea="isTextArea"
            :value="data"
            :inputClasses="['form-control', inputClass, fontSize]"
            @blur="onBlur"
            @change="onTextValueChanged"
          />
        </div>
        <div v-else-if="isDate">
          <v-inline-date-picker
            @blur="onBlur"
            @input="onDateValueChanged"
            :date="dateInput"
          ></v-inline-date-picker>
        </div>
      </template>
      <template v-else>
        <div v-if="hasData" class="clickable my-auto w-100" @click="openEditor">
          <p
            v-if="isDate"
            class="mb-0 input-value"
            :class="[labelClass, labelWeightClass]"
          >
            {{ formattedDate }}
          </p>
          <p
            v-else-if="isCurrency"
            class="mb-0 input-value"
            :class="[labelClass, labelWeightClass]"
          >
            {{ data | currency("EUR") }}
          </p>

          <p
            ref="textLabel"
            v-else-if="isText"
            class="mb-0 one-line-value"
            :class="[labelClass, labelWeightClass]"
            :style="textStyle"
          >
            {{ linesCount > 1 ? slicedText(30) : data }}
          </p>
          <p
            ref="textLabel"
            v-else
            class="mb-0 input-value"
            :class="[labelClass, labelWeightClass]"
          >
            {{ showReadMore && !readMoreActivated ? slicedText(100) : data }}
            <br />
            <span
              class="clickable text-primary font-size-14"
              @click.stop.prevent="readMoreActivated = !readMoreActivated"
              v-if="showReadMore"
              >{{ readMoreActivated ? "Riduci" : "Leggi di più" }}</span
            >
          </p>
        </div>

        <p v-else class="text-primary clickable my-auto" @click="openEditor">
          {{ placeholder }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import VInlineEditor from '../components/VInlineEditor.vue';
import VNumericInput, { VNumericInputApplication } from '../components/VNumericInput.vue';
import VInlineDatePicker from '@/components/VInlineDatePicker.vue';
import moment from 'moment';
import VDatePicker from '@/components/VDatePicker.vue';
import NoCache from '../decorators/NoCache';
import { v1 as uuid } from 'uuid';
import { ENTER } from '@/utils/KeyboardHelper';
import { fontSize, Typography, numericalPart } from '@/utils/ScssHelper';
import {
  UK_DATE_FORMAT_DASHED,
  EU_DATE_FORMAT_SLASHED
} from '@/utils/DateHelper';

const MAX_LINES_COUNT = 2;
const FONT_SIZE_TO_LINE_HEIGHT_MULTIPLIER = 1.3;

@Component({
  components: {
    VNumericInput,
    VInlineEditor,
    VInlineDatePicker,
    VDatePicker
  }
})
export default class VBaseInlineInput extends Vue {
  @Prop({ default: 'text' }) readonly type!:
    | 'date'
    | 'text'
    | 'number'
    | 'percent'
    | 'currency'
    | 'textarea';

  @Prop({ required: false }) readonly label!: string;
  @Prop({ default: 'Aggiungi' }) readonly placeholder!: string;
  @Prop({ default: '' }) readonly value!: number | string | null;
  @Prop({ default: '' }) readonly labelClass!: string;
  @Prop({ default: '' }) readonly inputClass!: string;
  @Prop({ default: 'base' }) readonly fontSize!: Typography;
  @Prop({ default: true }) readonly labelBold!: boolean;
  @Prop({ default: false }) readonly fullWidthEditor!: boolean;
  @Ref('textLabel') readonly textInput: any;

  private open = false;
  private data: string | number | null = null;
  private linesCount: number | null = null;
  private readMoreActivated = false;
  private subscription: any = null;

  created() {
    if (this.isDate) {
      this.data = moment(this.value, UK_DATE_FORMAT_DASHED).toDate().getTime();
    } else if (this.isNumeric) {
      this.data = (this.value || 0).toString();
    } else {
      this.data = (this.value || 0).toString();
    }
  }

  mounted() {
    this.computeTextLinesCount();
  }

  subscribe() {
    this.subscription = (e: KeyboardEvent) => {
      if (e.key === ENTER) {
        this.onBlur();
      }
    };

    window.addEventListener('keydown', this.subscription);
  }

  destroyed() {
    this.unsuscribe();
  }

  unsuscribe() {
    window.removeEventListener('keydown', this.subscription);
  }

  get isNumeric() {
    return (
      this.type === 'percent' ||
      this.type === 'currency' ||
      this.type === 'number'
    );
  }

  get showReadMore() {
    return (this.linesCount || 0) > MAX_LINES_COUNT;
  }

  slicedText(sliceQuantity: number) {
    return this.data
      ? `${(this.data as string).slice(0, sliceQuantity)}...`
      : '';
  }

  @NoCache
  get dateInput() {
    return moment(this.data).toDate().getTime();
  }

  computeTextLinesCount() {
    if (this.textInput) {
      this.textInput.style.lineHeight =
        numericalPart(fontSize(this.fontSize)) *
          FONT_SIZE_TO_LINE_HEIGHT_MULTIPLIER +
        'rem';
      this.linesCount =
        this.textInput.clientHeight /
        (this.textInput.style.lineHeight.split('rem')[0] * 16);
    }

    return 0;
  }

  get labelWeightClass() {
    return this.labelBold ? 'font-weight-bold' : '';
  }

  onDateValueChanged(data: any) {
    this.data = data;
  }

  get currencyData() {
    return ``;
  }

  get textStyle() {
    return { fontSize: fontSize(this.fontSize) };
  }

  @NoCache
  get hasData() {
    return this.data !== '';
  }

  get isText() {
    return this.type === 'text';
  }

  get isDate() {
    return this.type === 'date';
  }

  get isCurrency() {
    return this.type === 'currency';
  }

  get formattedDate() {
    return moment(this.data).format(EU_DATE_FORMAT_SLASHED);
  }

  get isTextArea() {
    return this.type === 'textarea';
  }

  @NoCache
  get showEditor() {
    return this.open;
  }

  onBlur() {
    this.open = false;
    this.unsuscribe();
    this.notify(this.data);
  }

  openEditor() {
    this.open = true;
    if (!this.isDate) {
      this.subscribe();
    }
    if (this.isText || this.isTextArea) {
      this.$nextTick(() => {
        (this.$refs[this.textEditorRef] as any).setEditing(true);
      });
    }
  }

  get textEditorRef() {
    return `textInlineEditor-${uuid()}`;
  }

  onTextValueChanged(data: string) {
    this.data = data;
    if (this.isTextArea || this.isText) {
      this.$nextTick(() => {
        this.computeTextLinesCount();
      });
    }
  }

  onNumericValueChanged(data: string) {
    this.data = data;
  }

  notify(value: string | number | null) {
    if (this.isDate) {
      value = moment(value).format(UK_DATE_FORMAT_DASHED);
    }
    this.$emit('input', value);
  }

  get numericType() {
    switch (this.type) {
      case 'percent':
        return VNumericInputApplication.PERCENT;
      case 'number':
        return VNumericInputApplication.BASE;
      case 'currency':
        return VNumericInputApplication.CURRENCY;
    }
    return VNumericInputApplication.BASE;
  }
}
</script>

<style lang="scss" scoped>
@import "@/css/vue";
.datepicker input[readonly] {
  background-image: url(/img/calendar.0b8dc57b.svg);
  background-position: right 1rem center;
  background-size: 10px;
  background-repeat: no-repeat;
  padding-right: 42px;
  background: $input-background-color !important;
  cursor: pointer;
}

.input-value {
  word-wrap: break-word;

  &.collapsed {
    word-wrap: inherit;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
}

.one-line-value {
  word-wrap: inherit;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  &.collapsed {
  }
}
</style>
