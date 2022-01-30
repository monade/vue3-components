<template>
  <div class="entry-list" :class="getWrapperClass()">
    <h5 v-if="title">{{ title }}</h5>
    <ul class="list-unstyled">
      <li v-for="item of items" :key="item.id" @click.stop="select(item)">
        <slot v-if="item.image" name="logo"><img class="logo" :src="item.image"></slot>
        <span class="name">{{ item.name }}</span>

        <span class="action" v-if="actions">
          <template v-if="canAdd && canAdd(item)">
            <button class="btn btn-link" @click.stop="add(item)">
              <v-icon>plus-circle-full</v-icon>
            </button>
          </template>
          <template v-else>
            <button class="btn btn-link" @click.stop="remove(item)">
              <v-icon>close</v-icon>
            </button>
          </template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import VIcon from './VIcon.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VEntryInterface from '../models/Entry';

@Component({ components: { VIcon } })
export default class VEntryList extends Vue {
  @Prop() readonly title?: string;
  @Prop({ default: 'small' }) readonly size?: string;
  @Prop() readonly items!: VEntryInterface[];
  @Prop() readonly canAdd!: Function;
  @Prop({ default: true }) readonly actions? : boolean;
  @Prop({ default: false }) readonly selectable? : boolean;

  add(value: VEntryInterface) {
    this.$emit('add', value);
  }

  remove(value: VEntryInterface) {
    this.$emit('remove', value);
  }

  select(value: VEntryInterface) {
    if (this.selectable === false) {
      return;
    }

    this.$emit('selected', value);
  }

  getWrapperClass() {
    const classes: string[] = [];

    classes.push(`entry-list--${this.size}`);

    if (this.selectable) {
      classes.push('entry-list--selectable');
    }

    return classes;
  }
}
</script>

<style lang="scss" scoped>
  @import "../css/vue";

  .entry-list {
    padding: .25rem 0;

    &--small {
      ul {
        > li {
          .logo {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &--selectable {
      ul {
        > li {
          cursor: pointer;
        }
      }
    }

    h5 {
      font-weight: normal;
      font-size: .5rem;
      color: $secondary;
      text-transform: uppercase;
    }

    ul {
      margin-top: 0;
      margin-bottom: 2px;

      > li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid $gray-300;
        padding: .35rem 0;

        &:hover {
          background-color: $blue;
        }
        &:last-child {
          border-bottom: 0;
          margin-bottom: 0;
        }

        .logo {
          flex-shrink: 0;
        }

        .name {
          margin-left: .5rem;
          margin-right: .25rem;
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .action {
          width: 20px;
          height: 20px;
          text-align: center;
          flex-shrink: 0;
        }
      }
    }
  }
</style>
