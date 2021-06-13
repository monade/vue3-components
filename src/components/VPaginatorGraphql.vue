<template>
  <v-paginator
    :meta="graphQLMeta"
    :range="range"
    :loading="loading"
    :align="align"
  />
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
  @Prop({ required: true }) meta!: GraphQLPaginationMeta;

  @Prop({ default: 5 }) readonly range!: number;
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: null }) readonly align!: 'center' | 'right' | 'left' | null;

  get graphQLMeta(): PaginationMeta | null {
    if (!this.meta) {
      return null;
    }

    const adaptedMeta: PaginationMeta = {lastPage: 0, totalPages: 0, currentPage: 0, nextPage: null, previousPage: null};
    adaptedMeta.currentPage = this.meta.currentPage!;
    adaptedMeta.totalPages = this.meta.totalPages!;
    adaptedMeta.previousPage = this.meta.currentPage === 1 ? 1 : this.meta.currentPage! - 1;

    adaptedMeta.nextPage = this.meta.currentPage === this.meta.totalPages ?
      this.meta.totalPages :
      this.meta.currentPage! - 1;

    adaptedMeta.lastPage = this.meta.currentPage!;

    return adaptedMeta;
  }
}

</script>

<style lang="scss">

</style>
