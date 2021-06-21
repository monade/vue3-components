import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment'
import Show from './Show.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker';
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css';

library.add(faCircleNotch, faTimes)

const FaIcon = Vue.component('fa-icon', FontAwesomeIcon);
const datepickerOptions = {
  sundayFirst: false,
  days: moment.weekdays(true),
  daysShort: moment.weekdaysShort(true),
  monthNames: moment.months(),
  texts: {
    cancel: 'Chiudi',
    apply: 'Seleziona',
    keyboardShortcuts: 'Comandi da tastiera'
  },
  keyboardShortcuts: [
    { symbol: '↵', label: 'Seleziona la data attiva', symbolDescription: 'Invio' },
    { symbol: '←/→', label: 'Muovi avanti (destra) o indietro (sinistra) di un giorno.', symbolDescription: 'Frecce sinistra/destra' },
    { symbol: '↑/↓', label: 'Muovi avanti (sopra) o indietro (sotto) di una settimana.', symbolDescription: 'Frecce su/giù' },
    { symbol: 'PgUp/PgDn', label: 'Cambia mese.', symbolDescription: 'PagSu' },
    { symbol: 'Home/End', label: 'Vai al primo giorno del mese', symbolDescription: 'Tasto Home o End' },
    { symbol: 'Esc', label: 'Chiudi', symbolDescription: 'Esc' },
    { symbol: '?', label: 'Apri', symbolDescription: 'Punto di domanda' }
  ]
};

Vue.use(VueMoment, {
  moment
});

Vue.filter("currency", function(value: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency
  });
  return formatter.format(value);
});

Vue.use(AirbnbStyleDatepicker, datepickerOptions);

const vue = new Vue({
  render: h => h(Show),
  components: { FaIcon }
}).$mount('#app')
