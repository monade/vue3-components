<template>
  <div class="toggle-container clickable" :class="{checked: checked, unchecked: !checked, disabled: disabled}">
    <div class="toggle text-white"   @click="activate()">
      <input
       @click="activate()"
        :id="'toggle-on-'+toggleName"
        class="toggle"
        name="toggle"
        value="false"
        type="radio"

      >
      <label
        :for="'toggle-on-'+toggleName"
        :class="checked ? 'checked':'unchecked'"
        class="label m-0 text-white bg-white"
      ></label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VToggleSwitch extends Vue {
  @Prop({ required: true })
  readonly value!: boolean;

  @Prop({ required: false, default: false })
  readonly disabled!: boolean;

  get toggleName() {
    return `toggle_${(this as any)._uid}`;
  }

  private checked: boolean = this.value;
  activate() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.$emit('input', this.checked);
  }
}
</script>
<style lang="scss" scoped>
@import "../css/vue";

body,
html {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  z-index: -1;
}

.toggle-container {
  width: 50px;
  background: $body-bg;
  border: none;
  border-radius: 100px;
}

.toggle-container.unchecked {
  background-color: #B5B5B5;
}

.toggle-container.checked {
  background-color: $primary;
}

.toggle-container.disabled {
  background-color: $text-muted;
}

.toggle {
  cursor: pointer;
  width: 50px;
  height: 20px;
}

.label {
  border-radius: 50px;
  border: none;
  height: 16px;
  margin-top: 2px !important;
  transition: left 100ms cubic-bezier(0.77, 0, 0.175, 1);
}

.label.checked {
  -webkit-transition: 100ms;
  -moz-transition: 100ms;
  -ms-transition: 100ms;
  -o-transition: 100ms;
  transition: 100ms;
  margin-left:32px !important;
}

.label.unchecked {
  -webkit-transition: 100ms;
  -moz-transition: 100ms;
  -ms-transition: 100ms;
  -o-transition: 100ms;
  transition: 100ms;
   margin-left:2px !important;
}

.btn {
  display: inline-block;
  padding: 10px;
  position: relative;
  text-align: center;
  transition: right 600ms ease, color 600ms ease;
}

input[type="radio"].toggle {
  display: none;
  height: 25px;
  & + label {
    cursor: pointer;
    min-width: 16px;
    &:hover {
      background: none;
      color: #1a1a1a;
    }
    &:after {
      background: transparent;
      content: "";
      position: absolute;
      top: 0;
      transition: left 100ms cubic-bezier(.77, 0, .175, 1);
      z-index: -1;
    }
  }
}
</style>
