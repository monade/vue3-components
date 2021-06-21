declare module 'vue-airbnb-style-datepicker' {
  import Vue, { PluginFunction } from 'vue';

  interface DatepickerOptions {
    sundayFirst: boolean;
    days: string[];
    daysShort: string[];
    monthNames: string[];
    texts: {
      cancel: string;
      apply: string;
      keyboardShortcuts: string;
    };
    keyboardShortcuts: {
      symbol: string;
      label: string;
      symbolDescription: string;
    }[];
  }

  class AirbnbStyleDatepicker extends Vue  {
    [key: string]: any;
    static install: PluginFunction<DatepickerOptions>;

    width: number;
    selectedDate1: string;
    selectedDate2: string;
  }

  export default AirbnbStyleDatepicker;
}

declare module 'vue-numeric';
