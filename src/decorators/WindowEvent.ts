import { App } from 'vue';
import { createDecorator } from 'vue-facing-decorator';

export default (eventName: string) => {
  return createDecorator((options, key) => {
    // eslint-disable-next-line
    const bindings: { [key: string]: (...args: any[]) => void } = {};
    const beforeCreate = function(this: App<any>) {
      if (options.methods) {
        bindings[eventName] = (options.methods)[key].bind(this);
        window.addEventListener(eventName, bindings[eventName]);
      }
    };

    const unmounted = function(this: App<any>) {
      window.removeEventListener(eventName, bindings[eventName]);
    };

    if (options.beforeCreate) {
      const oldBeforeCreate = options.beforeCreate;
      options.beforeCreate = function() {
        oldBeforeCreate.bind(this)();
        beforeCreate.bind(this)();
      };
    } else {
      options.beforeCreate = beforeCreate;
    }

    if (options.unmounted) {
      const oldunmounted = options.unmounted;
      options.unmounted = function(this: App<any>) {
        oldunmounted.bind(this)();
        unmounted.bind(this)();
      };
    } else {
      options.unmounted = unmounted;
    }
  });
};
