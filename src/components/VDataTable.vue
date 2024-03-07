<template>
  <div class="data-table-container">
    <div class="table-responsive" :class="{'content-loading': loading}">
      <table class="table" :class="tableClasses">
        <thead class="thead-light">
          <tr>
            <th v-for="column in columns" :key="column.name" :class="getColumnClass(column)">
              <a href="#" @click.prevent="sortBy(column)" v-if="sortable && column.sortable !== false">
                {{ column.label }}
                <template v-if="isSortedBy(column)">
                  <slot v-if="isSortedByDesc(column)" name="sort-icon-down">⇩</slot>
                  <slot v-else name="sort-icon-up">⇧</slot>
                </template>
              </a>
              <template v-else>
                {{ column.label }}
              </template>
            </th>
            <th v-if="hasActions()" class="col-actions">
              <slot name="actions-label">Actions</slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="values.length">
          <tr v-for="value in values" :key="value.id">
            <td v-for="column in columns" :key="column.name" :class="getColumnClass(column)" @click="select(value)">
              <template v-if="hasSlot(column)">
                <slot :name="getSlotName(column)" :value="value"></slot>
              </template>
              <template v-else>
              {{ getValue(column, value) }}
              </template>
            </td>
            <td class="col-actions" v-if="hasActions()">
              <slot name="actions" :value="value"></slot>
            </td>
          </tr>
          </template>
          <template v-else>
          <tr>
            <td :colspan="columnsTotal" class="col-no-results">
              <span v-if="!loading">
                <slot name="no-results-label">No result</slot>
              </span>
            </td>
          </tr>
          </template>
        </tbody>
      </table>
      <div class="loading-label" v-if="loading">
        <slot name="loading">Loading...</slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-facing-decorator';

interface ColumnData {
  sortable: boolean;
  sort: string;
  name: string;
  class: string;
  default: string;
  label: string;
}

@Component({
  emits: ['selected', 'sorted']
})
export default class VDataTable extends Vue {
  @Prop({ required: true }) readonly columns!: ColumnData[];
  @Prop({ default: 'table-sm table-hover' }) readonly tableClasses!: string;
  @Prop({ required: true }) readonly values!: any[];
  @Prop({ default: '' }) readonly sort!: string;
  @Prop({ default: true }) readonly sortable!: boolean;
  @Prop({ default: true }) readonly loading!: boolean;

  _sort: Map<string, string> = new Map();

  get columnsTotal() {
    let total = this.columns.length;

    if (this.hasActions()) {
      total++;
    }

    return total;
  }

  @Watch('sort')
  onSortChanged() {
    this.parseSort();
  }

  created() {
    this.parseSort();
  }

  select(value: any) {
    this.$emit('selected', value);
  }

  parseSort() {
    this._sort = new Map();

    this.sort.split(',').map(item => {
      const order = item[0] === '-' ? '-' : '';
      const key = order ? item.substr(1) : item;
      this._sort.set(key, order)
    })
  }

  sortBy(column: ColumnData) {
    if (!this.sortable) {
      return;
    }

    const name = column.sort || column.name;
    let order = this._sort.get(name);

    if (order == null) {
      order = '';
    } else {
      order = order === '-' ? '' : '-';
    }

    const sort = `${order}${name}`;
    this.$emit('sorted', sort);
  }

  isSortedBy(column: ColumnData) {
    const name = column.sort || column.name;
    return this._sort.get(name) != null;
  }

  isSortedByDesc(column: ColumnData) {
    const name = column.sort || column.name;
    return this._sort.get(name) === '-';
  }

  getColumnClass(column: ColumnData) {
    const columnClass: { [key: string]: boolean } = {
      'col-order-by': this.isSortedBy(column)
    };

    columnClass[`col-data__${column.name}`] = true;

    if (column.class) {
      columnClass[column.class] = true;
    }

    return columnClass;
  }

  getValue(column: ColumnData, value: any) {
    if (column.name.indexOf('.') !== -1) {
      const methodChain = column.name.split('.');
      let result = value;
      for (const method of methodChain) {
        result = result ? result[method] : null;
      }
      return result || column.default;
    }
    return value[column.name] || column.default;
  }

  hasActions() {
    return this.$slots.actions != null;
  }

  getSlotName(column: ColumnData) {
    return `column_${column.name}`;
  }

  hasSlot(column: ColumnData) {
    const slotName = this.getSlotName(column);
    return this.$slots[slotName] != null;
  }
}
</script>

<style lang="scss" scoped>
  .table-responsive {
    min-height: 320px;
  }

  .col-no-results {
    height: 270px;
    vertical-align: middle;
    border-bottom: 0;
  }
</style>
