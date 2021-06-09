import { createDecorator } from 'vue-class-component';
import Vue from 'vue';

export default (eventName: string) => {
  return createDecorator((options, key) => {
    // eslint-disable-next-line
    const bindings: { [key: string]: (...args: any[]) => void } = {};
    const beforeCreate = function(this: Vue) {
      if (options.methods) {
        bindings[eventName] = (options.methods)[key].bind(this);
        window.addEventListener(eventName, bindings[eventName]);
      }
    };

    const destroyed = function(this: Vue) {
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

    if (options.destroyed) {
      const olddestroyed = options.destroyed;
      options.destroyed = function(this: Vue) {
        olddestroyed.bind(this)();
        destroyed.bind(this)();
      };
    } else {
      options.destroyed = destroyed;
    }
  });
};
