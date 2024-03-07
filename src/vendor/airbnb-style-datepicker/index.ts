import clickOutside from '@/directives/ClickOutside'
import AirbnbStyleDatepicker from './components/AirbnbStyleDatepicker.vue'

const AirbnbStyleDatepickerPlugin = {
  install(Vue: any, options: any) {
    Vue.directive('click-outside', clickOutside)

    Vue.component(AirbnbStyleDatepicker.name, {
      ...options,
      ...AirbnbStyleDatepicker,
    })
  },
}
export default AirbnbStyleDatepickerPlugin
