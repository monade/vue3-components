import { createDecorator } from 'vue-facing-decorator';

export default createDecorator((options, key) => {
  // component options should be passed to the callback
  // and update for the options object affect the component
  options.computed = options.computed || {};
  if (options.computed[key]) {
    (options.computed[key] as { cache?: boolean }).cache = false;
  }
});
