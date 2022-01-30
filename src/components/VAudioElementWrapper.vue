<template>
  <audio class="lazy-audio" ref="audio-ctrl">
    <source v-for="(source, idx) in sources" v-bind:key="idx" :data-src="source"/>
  </audio>
</template>

<script lang="ts">
import { Ref, Prop, Component, Vue } from 'vue-property-decorator';

const EVENT_PLAYING = 'playing';
const EVENT_TIMEDOUT = 'timedout';
const EVENT_PAUSED = 'paused';
const EVENT_ERROR = 'error';
const EVENT_TIME_UPDATED = 'timeupdate';

const TIMEOUT_MESSAGE = 'timed out';
const CAN_PLAY_MESSAGE = 'can play';

@Component({ })
export default class AudioElementWrapper extends Vue {
  @Prop({ default: false }) readonly canPause!: boolean;
  @Prop({ default: 1000 }) readonly timeOut!: number;
  @Prop({ default: () => [] }) readonly sources!: string[];

  @Ref('audio-ctrl') audio!: HTMLAudioElement;

  private playing = false;

  private _canPlayThrough!: Promise<string>;

  mounted() {
    this.setErrorHandler();
    this.setProgressionNotification();
    this.setCanPlayThroughHandler();
  }

  isLoaded() {
    return this.audio?.getAttribute('loaded');
  }

  private setErrorHandler() {
    this.audio.addEventListener('error', () => {
      if (this.playing) {
        this.emitNotification(EVENT_ERROR);
      }
    }, true);
  }

  private setCanPlayThroughHandler() {
    this._canPlayThrough = new Promise((resolve) => {
      this.audio.addEventListener('canplaythrough', () => {
        this.$nextTick().then(() => {
          this.setLoaded('loaded');
          resolve(CAN_PLAY_MESSAGE);
        });
      });
    });
  }

  private startTimeOut(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TIMEOUT_MESSAGE);
      }, this.timeOut);
    });
  }

  private stopByGivenCondition(shouldPause: boolean) {
    if (shouldPause) {
      this.stop();
    }
  }

  private setProgressionNotification() {
    this.audio.addEventListener('timeupdate', () => {
      const progression = this.audio.currentTime / this.audio.duration * 100;
      this.emitNotification(EVENT_TIME_UPDATED, { progression });
      this.stopByGivenCondition(progression === 100.0);
    });
  };

  private emitNotification<T>(which: string, what: T|null = null) {
    if (what) {
      this.$emit(which, what);
    } else {
      this.$emit(which);
    }
  }

  setLoaded(loaded: string) {
    this.audio.setAttribute('loaded', loaded);
  }

  async play() {
    this.playing = true;
    if (this.isLoaded()) {
      this.playAndNotify();
    } else {
      await this.loadAndPlayIfItDoesNotTimeOutFirst();
    }
  }

  private async playOrTimeoutStartRace() {
    return await Promise.race([this._canPlayThrough, this.startTimeOut()]);
  }

  private playAndNotify() {
    this.playing = true;
    this.emitNotification(EVENT_PLAYING);
    this.audio.play();
  }

  private checkIfVideoCanBePlayedAnyway() {
    return this.audio.readyState > 2;
  }

  private async loadAndPlayIfItDoesNotTimeOutFirst() {
    this.load();
    if (await this.playOrTimeoutStartRace() === CAN_PLAY_MESSAGE) {
      this.playAndNotify();
    } else {
      if (this.checkIfVideoCanBePlayedAnyway()) {
        this.playAndNotify();
      } else {
        this.timeOutHandler();
      }
    }
  }

  private timeOutHandler() {
    this.playing = false;
    this.emitNotification(EVENT_TIMEDOUT);
    this.unload();
  }

  stop() {
    this.pause(false);
  }

  pause(avoidReset = true) {
    this.playing = false;
    this.audio.pause();
    this.emitNotification(EVENT_PAUSED);
    if (this.canPause && avoidReset) {
      return;
    }
    this.reset();
  }

  private load() {
    const sourcesFound = this.audio.querySelectorAll('source');
    if (sourcesFound) {
      sourcesFound.forEach((source: HTMLSourceElement) => {
        if (source.dataset.src) {
          source.setAttribute('src', source.dataset.src);
        }
      });
      this.audio.load();
    }
  }

  private unload() {
    const sourcesFound = this.audio.querySelectorAll('source');
    if (sourcesFound) {
      sourcesFound.forEach((source: HTMLSourceElement) => {
        if (source.dataset.src) {
          source.removeAttribute('src');
        }
      });
      this.audio.load();
    }
  }

  addEventListener(event: string, handler: () => void, mustForce = false) {
    this.audio.addEventListener(event, handler, mustForce);
  }

  reset() {
    this.audio.currentTime = 0;
    this.emitNotification(EVENT_TIME_UPDATED, this.audio.currentTime);
  }
}
</script>
