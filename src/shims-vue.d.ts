/// <reference types="vite/client" />

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $filters: {
      currency: (...args) => string;
    };
  }
}

export { };

declare module '*.scss' {
  const variables: any;
  export default variables;
}

declare module '@robin-rossow/vue-input-number';
