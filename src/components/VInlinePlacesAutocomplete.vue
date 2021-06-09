<template>
  <places-autocomplete :api-key="apiKey" :options="options" :value="value" @selected="onPlaceSelected" :disabled="disabled" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import VPlacesAutocomplete from './VPlacesAutocomplete.vue';

@Component({ components: { VPlacesAutocomplete } })
export default class VInlinePlacesAutocomplete extends Vue {
  @Prop({
    required: false,
    default: () => {
      return { types: ['address'], country: 'it' };
    }
  }) readonly options!: any;

  @Prop({ required: true }) readonly apiKey!: string;
  @Prop() readonly dataKeys?: string[];
  @Prop() readonly value!: string;
  @Prop({ default: false }) readonly disabled?: boolean;

  onPlaceSelected(place: any) {
    this.$emit('selected', this.outputParams(place));
  }

  outputParams(data: any) {
    let payload: any = {};
    if (this.dataKeys && this.dataKeys.length) {
      for (let i = 0; i < this.dataKeys.length; i++) {
        const key = this.dataKeys[i];
        const isLast = i === this.dataKeys.length - 1;

        if (i === 0) {
          this.formatData(isLast, data, payload, key);
        } else {
          let temp = null;
          for (let y = 0; y < i; y++) {
            temp = temp ? temp[this.dataKeys[y]] : payload[this.dataKeys[y]];
          }
          this.formatData(isLast, data, temp, key);
        }
      }
    } else {
      payload = data;
    }
    return payload;
  }

  formatData(isLast: boolean, data: any, output: any, key: string) {
    output[key] = isLast ? data.address_components : {};
    if (isLast) {
      output.address = { fullAddress: data.formatted_address };
      output.latitude = data.geometry?.location?.lat();
      output.longitude = data.geometry?.location?.lng();
    }
  }
}
</script>
