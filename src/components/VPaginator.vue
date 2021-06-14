<template>
  <nav aria-label="Page navigation example" v-if="isReady">
    <ul class="pagination" :class="alignClass">
      <li class="page-item" :class="{ 'disabled': previousDisabled }">
        <a class="page-link" href="#" aria-label="First" @click.prevent="goToFirst">
          <slot name="first-arrow">&lt;&lt;</slot>
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': previousDisabled }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="goToPrevious">
          <slot name="left-arrow">⇦</slot>
        </a>
      </li>

      <li
        class="page-item"
        :class="{ 'active': isCurrent(item) }"
        v-for="item in pages"
        :key="item"
      >
        <a class="page-link" href="#" @click.prevent="goTo(item)">{{ item }}</a>
      </li>

      <li class="page-item" :class="{ 'disabled': nextDisabled }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="goToNext">
          <slot name="right-arrow">⇨</slot>
        </a>
      </li>
      <li class="page-item" :class="{ 'disabled': nextDisabled }">
        <a class="page-link last-link" href="#" aria-label="Last" @click.prevent="goToLast">
          <slot name="last-arrow">&gt;&gt;</slot>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface PaginationMeta {
  lastPage: number;
  currentPage: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}

@Component
export default class VPaginator extends Vue {
  @Prop({ required: true }) readonly meta!: PaginationMeta;
  @Prop({ default: 5 }) readonly range!: number;
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: null }) readonly align!: 'center' | 'right' | 'left' | null;

  private page = 1;
  private ready = false;

  get previousDisabled() {
    return this.meta.previousPage == null;
  }

  get nextDisabled() {
    return this.meta.nextPage == null;
  }

  get pages() {
    const step = Math.floor(this.range / 2);
    let first = this.page - step;

    if (first <= 0) {
      first = 1;
    }

    let last = first + this.range - 1;

    if (last > this.meta.lastPage) {
      last = this.meta.lastPage;
    }

    if (last === this.meta.lastPage) {
      const count = last - first + 1;
      first = first - (this.range - count);

      if (first <= 0) {
        first = 1;
      }
    }

    const items: number[] = [];
    for (let i = first; i <= last; i++) {
      items.push(i);
    }

    return items;
  }

  get alignClass() {
    switch (this.align) {
      case 'center':
        return 'justify-content-center';
      case 'right':
        return 'justify-content-end';
      case 'left':
      default:
        return null;
    }
  }

  created() {
    if (this.meta.currentPage) {
      this.page = this.meta.currentPage;
      this.ready = true;
    }
  }

  goTo(item: number) {
    this.page = item;
    this.$emit('change', this.page);
  }

  goToPrevious() {
    let previous = this.page - 1;

    if (previous <= 0) {
      previous = 1;
    }

    this.goTo(previous);
  }

  goToNext() {
    let next = this.page + 1;

    if (next > this.meta.lastPage) {
      next = this.meta.lastPage;
    }

    this.goTo(next);
  }

  goToFirst() {
    this.goTo(1);
  }

  goToLast() {
    this.goTo(this.meta.lastPage);
  }

  isCurrent(item: number) {
    return item === this.page;
  }

  get isReady() {
    return this.ready && this.meta.totalPages > 1;
  }
}
</script>

<style lang="scss" scoped>
.page-item {
  min-width: 52px;
  text-align: center;
  user-select: none;
}
</style>
