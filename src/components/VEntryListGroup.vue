<template>
  <div class="entry-list-group">
    <template v-if="items && items.length">
      <div v-for="item in items" :key="item.id">
        <v-entry-list :title="item.title"
          :items="item.entries"
          :can-add="canAdd"
          :actions="actions"
          :selectable="selectable"
          @add="onAdd"
          @remove="onRemove"
          @selected="onSelected" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VEntryList from './VEntryList.vue';
import Entry from '../models/Entry';
import EntryGroupItem from '../models/EntryGroupItem';

@Component({
  components: {
    VEntryList
  }
})
export default class VEntryListGroup extends Vue {
  @Prop() readonly items!: Array<EntryGroupItem>;

  @Prop() readonly canAdd? : Function;
  @Prop({ default: false }) readonly selectable? : boolean;
  @Prop({ default: true }) readonly actions? : boolean;

  onAdd(value: Entry) {
    this.$emit('add', value);
  }

  onRemove(value: Entry) {
    this.$emit('remove', value);
  }

  onSelected(value: Entry) {
    this.$emit('selected', value);
  }
}
</script>
