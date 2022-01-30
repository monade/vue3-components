import * as moment from 'moment';

declare module 'vue/types/vue' {
  interface Vue {
    $moment: any
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  // Vue.component('fa-icon', FontAwesomeIcon);

  // Vue.use(VueMoment, {
  //   moment
  // });
  Vue.prototype.$moment = moment;
  export default Vue
}

declare module '*.scss' {
  const variables: any;
  export default variables;
}

declare module 'uuid';
declare module 'vue-numeric';
