<template>
  <span class="timeslot-select" v-click-outside="closeDropdown">
    <input type="text" class="form-control" readonly :value="label" @click.prevent="toggleDropdown" />
    <div class="timeslot-select__dropdown" :class="`timeslot-select__dropdown--${dropdownAlign}`" v-show="visible">
      <div class="d-flex align-items-center mb-2">
          <span class="mr-2">Dalle</span>
          <v-time-picker v-model="from" />
          <span class="ml-3 mr-2">Alle</span>
          <v-time-picker v-model="to" />
      </div>
      <button class="btn btn-link" :disabled="isAddDisabled()" @click="createSlot">Aggiungi fascia oraria</button>
      <div class="mt-3" v-if="slots.length">
        <div class="text-secondary">Fasce inserite</div>
        <ul class="list-unstyled mt-1">
          <li v-for="(slot, index) in slots" :key="index">
            <a href="#delete" class="mr-1" @click.prevent="deleteSlot(index)">
              <v-icon>close-circle</v-icon>
            </a>
            {{ slot.from }} - {{ slot.to }}
          </li>
        </ul>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import VTimePicker, { TIME_FORMAT } from './VTimePicker.vue';
import ClickOutside from '../directives/ClickOutside';

export interface SlotObject {
  from: string;
  to: string;
}

@Component({
  components: {
    VTimePicker
  },
  directives: {
    ClickOutside
  }
})
export default class TimeSlotPicker extends Vue {
  @Prop({ required: true }) readonly value!: Array<SlotObject>;
  @Prop({ default: 'left' }) readonly dropdownAlign!: string;

  from = '';
  to = '';

  visible = false;

  slots: Array<SlotObject> = [];

  @Watch('from')
  onFromChange(value: string) {
    const from = this.$moment(value, TIME_FORMAT);
    const to = this.$moment(this.to, TIME_FORMAT);

    if (from.isAfter(to) || !this.to) {
      this.to = from.add(1, 'hour').format(TIME_FORMAT);
    }
  }

  get label(): string {
    if (this.slots.length === 0) {
      return 'Nessuna';
    }

    let label = this.slots[0].from + ' - ' + this.slots[0].to;

    if (this.slots.length > 1) {
      label = label + ' e altre ' + (this.slots.length - 1);
    }

    return label;
  }

  created() {
    this.slots = this.value;
    this.initializeTime();
  }

  initializeTime() {
    if (this.slots.length) {
      const slot = this.slots[this.slots.length - 1];
      this.from = slot.to;
      this.to = this.$moment(this.to, TIME_FORMAT).add(1, 'hour').format(TIME_FORMAT);
    } else {
      this.from = '00:00';
      this.to = '01:00';
    }
  }

  toggleDropdown() {
    this.visible = !this.visible;
  }

  closeDropdown() {
    if (this.visible) {
      this.visible = false;
    }
  }

  isAddDisabled() {
    if ((this.from === this.to) || !this.from || !this.to) {
      return true;
    }

    return false;
  }

  createSlot() {
    this.slots.push({
      from: this.from,
      to: this.to
    });

    this.$emit('input', this.slots);
    this.initializeTime();
  }

  deleteSlot(index: number) {
    this.slots.splice(index, 1);
    this.$emit('input', this.slots);
  }
}
</script>

<style lang="scss" scoped>
  @import '../css/vue';

  .timeslot-select {
    position: relative;
    display: inline-block;

    input {
      @include input-with-icon($icon-clock);
      background-size: 13px;
      cursor: pointer;
      padding-right: 40px;
    }

    &__dropdown {
      @extend %dropdown;
      padding: 1rem;
      font-size: $font-size-sm;

      &--left {
        left: 0;
      }

      &--right {
        right: 0;
      }
    }
  }
</style>
