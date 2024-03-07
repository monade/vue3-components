<template>
  <div class="modal-wrapper">
    <transition name="fade">
    <div ref="modal" class="modal fade show" :class="{'without-header': !hasHeader() }" tabindex="-1" role="dialog" aria-hidden="true"  v-if="visible">
      <div class="modal-dialog modal-dialog-centered" :class="'modal-'+size" role="document" >
        <div class="modal-content" :class="contentClasses" v-click-outside="onOutsideClick">
          <div class="modal-header" :class="headerClasses">
            <h5 class="modal-title w-100" v-if="hasHeader()">
              <slot name="header"></slot>
            </h5>
          </div>
          <div class="modal-body" :class="bodyClasses">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="hasFooter()" :class="footerClasses">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fade">
    <div class="modal-backdrop fade show" v-if="visible" @click.prevent="hide()"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-facing-decorator';
import ClickOutside from '../directives/ClickOutside';

@Component({
  directives: { ClickOutside },
  emits: ['shown', 'hidden']
})
export default class VModal extends Vue {
  @Prop({ default: '', required: false })
  readonly contentClasses!: string;

  @Prop({ default: '', required: false })
  readonly headerClasses!: string;

  @Prop({ default: '', required: false })
  readonly bodyClasses!: string;

  @Prop({ default: '', required: false })
  readonly footerClasses!: string;

  @Prop({ default: true, required: false })
  readonly hidesOnClickOut!: boolean;

  @Prop({ default: 'md', required: false })
  readonly size!: string;

  visible = false;

  hideable = false;

  eventListener(e: KeyboardEvent) {
    if (e.keyCode === 27 && this.hidesOnClickOut) {
      this.hide();
    }
  }

  show() {
    this.visible = true;
    this.$emit('shown');
    this.$nextTick(() => {
      this.hideable = true;
    });
    this.registerKeyDownEvents();
  }

  registerKeyDownEvents() {
    window.addEventListener('keydown', this.eventListener);
  }

  unregisterKeyDownEvents() {
    window.removeEventListener('keydown', this.eventListener);
  }

  onOutsideClick() {
    if (this.hideable && this.hidesOnClickOut) {
      this.hide();
    }
  }

  hide() {
    this.visible = false;
    this.hideable = false;
    this.$emit('hidden');
    this.unregisterKeyDownEvents();
  }

  hasHeader() {
    return this.$slots.header != null;
  }

  hasFooter() {
    return this.$slots.footer != null;
  }

  onKeyPress() {
    if (this.visible) {
      this.hide();
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    overflow-y: auto;

    &.show {
      display: block;
    }
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
