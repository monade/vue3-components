const DEFAULT_TIME = 200;

export default class Throttler {
  time: number;
  action?: () => void;

  timeout = 0;

  constructor(time = DEFAULT_TIME) {
    this.time = time;
  }

  run(action: () => void) {
    this.action = action;
    clearTimeout(this.timeout);

    this.timeout = window.setTimeout(this.runAction.bind(this), this.time);
  }

  runAction() {
    (this as any).action();
  }
}
