export default {
  bind(el: HTMLElement & any, binding: any, vnode: any) {
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
  unbind(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
    delete el.clickOutsideEvent;
  }
};
