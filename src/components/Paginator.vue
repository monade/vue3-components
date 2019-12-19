<template>
  <nav aria-label="Page navigation example" v-if="isReady()">
    <ul class="pagination" :class="alignClass">
      <li class="page-item" :class="{ 'disabled': this.meta.previousPage == null }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="goToPrevious">
          <slot name="left-arrow">⇨</slot>
        </a>
      </li>

      <li class="page-item" :class="{ 'active': isCurrent(item) }" v-for="item in pages" :key="item">
        <a class="page-link" href="#" @click.prevent="goTo(item)" >{{ item }}</a>
      </li>

      <li class="page-item" :class="{ 'disabled': this.meta.nextPage == null }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="goToNext">
          <slot name="right-arrow">⇦</slot>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    },

    range: {
      type: Number,
      required: false,
      default: 5
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    },

    align: {
      type: String,
      required: false,
      default: null
    },
  },

  data() {
    return {
      page: 1,
      ready: false
    }
  },

  computed: {
    pages() {
      const step = Math.floor(this.range / 2);
      let first = this.page - step;

      if(first <= 0) {
        first = 1;
      }

      let last = first + this.range - 1;

      if(last > this.meta.lastPage) {
        last = this.meta.lastPage;
      }

      if(last == this.meta.lastPage) {
        let count = last - first + 1;
        first = first - (this.range - count);

        if(first <= 0) {
          first = 1;
        }
      }

      let items = [];
      for(let i = first; i <= last; i++) {
        items.push(i);
      }

      return items;
    },

    alignClass() {
      switch(this.align) {
        case 'center':
          return 'justify-content-center';
        case 'right':
          return 'justify-content-end';
        case 'left':
        default:
          return null;
      }
    }
  },

  created() {
    if(this.meta.currentPage) {
      this.page = this.meta.currentPage
      this.ready = true;
    }
  },

  watch: {
    meta(value) {
      if(value.currentPage) {
        this.page = value.currentPage
        this.ready = true;
      }
    }
  },

  methods: {
    goTo(item) {
      this.page = item;
      this.$emit('change', this.page);
    },

    goToPrevious() {
      let previous = this.page - 1;

      if(previous <= 0) {
        previous = 1;
      }

      this.goTo(previous);
    },

    goToNext() {
      let next = this.page + 1;

      if(next > this.meta.lastPage) {
        next = this.meta.lastPage;
      }

      this.goTo(next);
    },

    isCurrent(item) {
      return item == this.page;
    },

    isReady() {
      return this.ready && this.meta.totalPages > 1;
    },
  }
};
</script>

<style lang="scss" scoped>
  .page-item {
    min-width: 52px;
    text-align: center;
    user-select: none;
  }
</style>
