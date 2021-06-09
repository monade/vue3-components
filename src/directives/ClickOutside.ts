import { DirectiveOptions } from 'vue/types/umd';
import { DirectiveBinding } from 'vue/types/options';

type ClickEventHandler = (this: HTMLElement, ev: MouseEvent) => void;
type HTMLEventWithClickOutside = HTMLElement & { clickOutsideEvent?: ClickEventHandler };

const clickOutside: DirectiveOptions = {
  bind(el: HTMLEventWithClickOutside, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        if (!(binding.value instanceof Function)) {
          throw new Error(`Bad binding for: ${binding.expression}. Try removing the ()`);
        }
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el: HTMLEventWithClickOutside) {
    if (el.clickOutsideEvent) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
      delete el.clickOutsideEvent;
    }
  }
};

export default clickOutside;
