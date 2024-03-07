import { Directive } from "vue";

type ClickEventHandler = (this: HTMLElement, ev: MouseEvent | TouchEvent) => void;
type HTMLEventWithClickOutside = HTMLElement & { clickOutsideEvent?: ClickEventHandler };

const clickOutside: Directive<HTMLElement, Function> = {
  beforeMount(el: HTMLEventWithClickOutside, binding) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        if (!(binding.value instanceof Function)) {
          throw new Error(`Bad binding for: ${binding.arg}. Try removing the ()`);
        }
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
    document.body.addEventListener('touchstart', el.clickOutsideEvent);
  },
  unmounted(el: HTMLEventWithClickOutside) {
    if (el.clickOutsideEvent) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
      document.body.removeEventListener('touchstart', el.clickOutsideEvent);
    delete el.clickOutsideEvent;
    }
  }
};

export default clickOutside;
