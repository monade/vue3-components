<template>
  <input :id="id" autocomplete="new-password" class="borderless" :value="modelValue" :placeholder="placeholder" :disabled="disabled"  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-facing-decorator';

interface Autocomplete {
  addListener(key: string, callback: () => void): void;
}

interface AutocompleteConstructor {
  new(element: Element, options: any): Autocomplete;
}

declare global {
  interface Window {
    google: { maps: { places: { Autocomplete: AutocompleteConstructor } } };
  }
}

@Component({
  emits: ['selected']
})
export default class VPlacesAutocomplete extends Vue {
  @Prop({ required: true }) readonly apiKey!: string;
  @Prop({
    required: false,
    default: () => {
      return { types: ['address'], country: 'it' };
    }
  })
  readonly options: any;

  @Prop({ default: false }) readonly disabled?: boolean;

  @Prop() readonly modelValue!: string;

  get id() {
    return `autocomplete_${(this as any)._uid}`;
  }

  get placeholder() {
    return this.disabled ? '-' : 'Inserisci una posizione';
  }

  autocomplete: any = null;

  initialized() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.$el,
      this.options
    );
    this.autocomplete.addListener('place_changed', () => {
      this.onPlaceSelected(this.autocomplete.getPlace());
    });
  }

  @Watch("modelValue")
  onValueChange(newValue: string, oldValue: string) {
    console.warn('Changing value in runtime is not supported.', newValue, oldValue);
  }

  onPlaceSelected(place: any) {
    this.$emit('selected', place);
  }

  get scriptUrl() {
    return `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
  }

  mounted() {
    if (!window.google) {
      const plugin = document.createElement('script');
      plugin.setAttribute('src', this.scriptUrl);
      plugin.async = true;
      document.head.appendChild(plugin);
      plugin.onload = () => {
        this.initialized();
      };
    } else {
      this.initialized();
    }
  }
}
</script>

<style scoped>
</style>
