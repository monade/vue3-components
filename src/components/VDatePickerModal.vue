<template>
  <v-modal ref="modal" contentClasses="px-5 py-4">
    <template v-slot:header>
      <p class="font-weight-semibold text-center">{{title}}</p>
    </template>
    <template v-slot>
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <label>{{dateLabel}}</label>
            <input class="form-control grey" type="date" v-model="date" />
            <label class="mt-2">{{timeLabel}}</label>
            <input class="form-control grey mt-2" type="time" v-model="time" v-show="date" />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="row w-100">
        <div class="col-6 pl-0">
          <button
            type="button"
            class="btn btn-outline-primary w-100"
            @click.prevent="onCanceled"
          >Annulla</button>
        </div>
        <div class="col-6 pr-0">
          <button type="submit" class="btn btn-primary w-100" @click.prevent="onConfirmed">Conferma</button>
        </div>
      </div>
    </template>
  </v-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VModal from './VModal.vue';
import moment from 'moment';

@Component({ components: { VModal } })
export default class VDatePickerModal extends Vue {
  @Prop()
  readonly title?: string;

  @Prop()
  readonly dateLabel?: string;

  @Prop()
  readonly timeLabel?: string;

  @Prop()
  readonly datetime?: string;

  @Prop()
  readonly minDate?: string;

  @Prop()
  readonly maxDate?: string;

  private value = moment(this.datetime || new Date());
  private payload = null;

  private open = false;

  show() {
    const modal = this.$refs.modal as any;
    modal.show();
  }

  get date() {
    if (this.value) return moment(this.value).format('YYYY-MM-DD');
  }

  set date(date) {
    if (date) {
      this.value = moment(date + ' ' + (this.time || '00:00'));
    }
  }

  get time() {
    if (this.value) {
      return moment(this.value).format('HH:mm');
    }
  }

  set time(time) {
    if (time) {
      this.value = moment(this.date || new Date());
      const timeMoment = moment(time, 'HH:mm');
      this.value.set({
        hour: timeMoment.get('hour'),
        minutes: timeMoment.get('minutes')
      });
    }
  }

  hide() {
    const modal = this.$refs.modal as any;
    modal.hide();
  }

  reset() {
    return (this.value = moment(this.datetime || new Date()));
  }

  isOpen() {
    return this.isOpen;
  }

  get dateConfig() {
    const config: { from?: Date; to?: Date } = {};
    if (this.minDate) config.to = new Date(this.minDate);
    if (this.maxDate) config.from = new Date(this.maxDate);
    return config;
  }

  onCanceled() {
    this.hide();
    this.$emit('canceled');
    this.reset();
  }

  onConfirmed() {
    this.hide();
    this.$emit('confirmed', this.value);
  }
}
</script>
