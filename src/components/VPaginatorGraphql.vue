<template>
  <v-paginator
    v-if="isReady"
    :meta="graphQLMeta"
    :range="range"
    :loading="loading"
    :align="align"
    @change="onPageChange($event)"
  >
    <template v-slot:first-arrow>
      <slot name="first-arrow">&lt;&lt;</slot>
    </template>
    <template v-slot:left-arrow>
      <slot name="left-arrow">⇦</slot>
    </template>
    <template v-slot:right-arrow>
      <slot name="right-arrow">⇨</slot>
    </template>
    <template v-slot:last-arrow>
      <slot name="last-arrow">&gt;&gt;</slot>
    </template>
  </v-paginator>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import VPaginator, { PaginationMeta } from './VPaginator.vue';

export interface GraphQLPaginationMeta {
  currentPage: number | null;
  limitValue: number | null;
  totalCount: number | null;
  totalPages: number | null;
}

@Component({
  components: {
    VPaginator
  }
})
export default class VPaginatorGraphql extends Vue {
  @Prop({ required: true }) readonly meta!: GraphQLPaginationMeta;

  @Prop({ default: 5 }) readonly range!: number;
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: null }) readonly align!: 'center' | 'right' | 'left' | null;

  get graphQLMeta(): PaginationMeta | null {
    const adaptedMeta: PaginationMeta = {lastPage: 0, totalPages: 0, currentPage: 0, nextPage: null, previousPage: null};
    adaptedMeta.currentPage = this.meta.currentPage!;
    adaptedMeta.totalPages = this.meta.totalPages!;
    adaptedMeta.previousPage = this.meta.currentPage === 1 ? null : this.meta.currentPage! - 1;

    adaptedMeta.nextPage = this.meta.currentPage === this.meta.totalPages ?
      null :
      this.meta.currentPage! + 1;

    adaptedMeta.lastPage = this.meta.totalPages!;

    return adaptedMeta;
  }

  get isReady() {
    return this.meta ? true : false;
  }

  private onPageChange(page: number) {
    this.$emit('change', page);
  }
}

</script>

<style lang="scss">

</style>
