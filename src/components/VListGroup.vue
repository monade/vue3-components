<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" :class="itemClass(item)" v-for="(item, index) of items" :key="index" @click="select(item, index)" @mouseenter="onStartOver(item)" @mouseleave="onEndOver(item)">
      <template v-if="ordered">
      <span class="badge badge-circle">{{ index + 1 }}</span>
      </template>
      <slot name="item" :value="item"></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface VListGroupItem {
  [key: string]: string|number|null|undefined;
}

@Component
export default class VListGroup extends Vue {
  @Prop() readonly items!: Array<VListGroupItem>;
  @Prop({ default: false }) readonly ordered? : boolean;
  @Prop({ default: false }) readonly selectable? : boolean;
  @Prop() readonly isHighlighted? : Function;
  @Prop() readonly isOver? : Function;

  overed: VListGroupItem|undefined = {};

  select(item: VListGroupItem, index: number) {
    if (!this.selectable) {
      return;
    }

    this.$emit('selected', item, index);
  }

  itemClass(item: VListGroupItem) {
    const over = (this.overed && this.overed === item) || (this.isOver && this.isOver(item));

    return {
      'list-group-item--selectable': this.selectable,
      'list-group-item--highlighted': this.isHighlighted && this.isHighlighted(item),
      'list-group-item--over': over
    };
  }

  onStartOver(item: VListGroupItem) {
    this.overed = item;
    this.$emit('over', item);
  }

  // eslint-disable-next-line
  onEndOver(item: VListGroupItem) {
    this.overed = undefined;
    this.$emit('over', undefined);
  }
}
</script>

<style lang="scss" scoped>
  @import "../css/vue";

  .list-group-item {
    border-bottom: 0;
    border-top: 1px solid $border-color !important;

    &:first-child {
      border-top: 0 !important;
    }

    > div, > span {
      margin-left: .5rem;
      margin-right: .5rem;

      &:first-child {
        margin-left: .25rem;
      }
    }

    &--selectable {
      cursor: pointer;
    }

    &--highlighted {
      border-top: 2px solid $success !important;
      border-bottom: 2px solid $success !important;
      border-left: 2px solid $success !important;
      border-right: 2px solid $success !important;
      margin-left: -2px;

      &:first-child {
        border-top: 2px solid $success !important;
      }
    }

    &--over {
      .badge-circle {
        color: $white;
        background-color: $success;
        border-color: $success;
      }
    }
  }

  .list-group-item--highlighted + .list-group-item  {
    border-top: 0 !important;
  }
</style>
