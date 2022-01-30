<template>
  <div :class="dropdownClass">
    <div class="multilevel-select__menu">
      <h6 class="multilevel-select__menu--header" v-if="header">{{ header }}</h6>
      <ul class="list-unstyled multilevel-select__menu" :class="{'multilevel-select__menu--multiple': multiple}">
        <li class="multilevel-select__menu--item"
          v-for="option in options"
          :key="option.id"
          @click.stop="select(option)"
          @mouseenter="onEnter(option)"
          @mouseleave="onLeave"
          :class="{ selected: option.selected, partial: option.partial, locked: option.locked }">
          <template v-if="multiple">
            <template v-if="option.locked !== true">
            <span class="multilevel-select__menu__button">
              <v-icon v-if="option.selected">check</v-icon>
              <v-icon v-if="option.partial">minus</v-icon>
            </span>
            </template>
            <template v-else>
              <v-icon>lock</v-icon>
            </template>
          </template>

          {{ option.text }}

          <v-multi-level-dropdown
            :parent="option"
            :options="option.children"
            :headers="headers"
            :level="subLevel"
            :nested="true"
            :multiple="multiple"
            v-show="childrenIsVisible(option)"
            v-if="option.children && option.children.length" @selected="onNestedSelected" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MultiLevelObject } from './VMultiLevelSelect.vue';
import VIcon from './VIcon.vue';

@Component({
  name: 'v-multi-level-dropdown',
  components: { VIcon }
})
export default class VMultiLevelDropdown extends Vue {
  @Prop() readonly options!: Array<MultiLevelObject>;
  @Prop({ default: false }) readonly nested? : boolean;
  @Prop() readonly headers? : Array<string>;
  @Prop({ default: 0 }) readonly level? : number;
  @Prop({ default: false }) readonly multiple? : boolean;
  @Prop() readonly parent?: MultiLevelObject;

  selected: MultiLevelObject|null = null;
  current: MultiLevelObject|null = null;

  timeOut: number|null = null;

  get header() {
    const level = this.level || 0;

    if (this.headers && this.headers.length) {
      return this.headers[level];
    } else {
      return null;
    }
  }

  get subLevel() {
    const level = this.level || 0;
    return level + 1;
  }

  get dropdownClass() {
    return {
      'multilevel-select__dropdown--nested': this.nested,
      'multilevel-select__dropdown': !this.nested,
      'multilevel-select__dropdown--with-header': this.header
    };
  }

  created() {
    this.options.forEach(option => {
      if (option.selected && option.children !== undefined) {
        this.updateChildren(option);
      }
    })
  }

  select(option: MultiLevelObject) {
    if (option.locked) {
      return;
    }
    if (this.multiple) {
      if (option.partial) {
        this.$set(option, 'selected', true);
        this.$set(option, 'partial', false);
      } else {
        if (option.selected === undefined || option.selected === false) {
          this.$set(option, 'selected', true);
        } else {
          this.$set(option, 'selected', false);
        }
      }

      this.updateChildren(option);
    }

    this.$emit('selected', option, this.level);
  }

  updateChildren(option: MultiLevelObject) {
    if (!option.children) {
      return;
    }

    option.children.forEach(child => {
      this.$set(child, 'selected', option.selected);

      if (option.selected) {
        this.$set(child, 'partial', false);
      }

      this.updateChildren(child);
    });
  }

  updatePartial() {
    this.options.forEach(option => {
      if (option.children) {
        const selected = option.children.filter(child => child.selected === true);

        if (selected.length === 0) {
          this.$set(option, 'selected', false);

          const partials = option.children.filter(child => child.partial === true);
          this.$set(option, 'partial', partials.length > 0);
        } else if (selected.length < option.children.length) {
          this.$set(option, 'selected', false);
          this.$set(option, 'partial', true);
        } else {
          this.$set(option, 'selected', true);
          this.$set(option, 'partial', false);
        }
      }
    });
  }

  childrenIsVisible(option: MultiLevelObject): boolean {
    if (this.current === null) {
      return false;
    }

    return this.current.id === option.id;
  }

  getSelectedOptions(options: MultiLevelObject[], level: number) {
    let selected: {
      [key: number]: string[];
    } = {};

    selected[level] = [];

    options.forEach(option => {
      if (option.selected) {
        selected[level].push(option.id);
      }

      if (option.children && option.children.length) {
        selected = {
          ...selected,
          ...this.getSelectedOptions(option.children, level + 1)
        }
      }
    })

    return selected;
  }

  onNestedSelected(option: MultiLevelObject, level: number) {
    if (this.multiple) {
      this.updatePartial();
    }

    this.$emit('selected', option, level);
  }

  onEnter(option: MultiLevelObject) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }

    this.current = option;
  }

  onLeave() {
    this.timeOut = setTimeout(() => {
      this.current = null;
      this.$emit('leave');
    }, 150);
  }
}
</script>
