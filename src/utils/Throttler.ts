const DEFAULT_TIME = 200;

export default class Throttler {
  private time: number;
  private action?: () => void;

  private timeout = 0;

  constructor(time = DEFAULT_TIME) {
    this.time = time;
  }

  run(action: () => void) {
    this.action = action;
    clearTimeout(this.timeout);

    this.timeout = window.setTimeout(this.runAction.bind(this), this.time);
  }

  private runAction() {
    (this as any).action();
  }
}
