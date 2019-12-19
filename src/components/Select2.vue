<template>
  <select>
    <option v-if="!tags && !multiple" :multiple="multiple"></option>
    <template v-if="!isXhr">
      <option
        v-for="option in options"
        v-bind:value="option.id"
        :key="option.id"
      >{{ option[labelProperty] }}</option>
    </template>
  </select>
</template>

<script>
import $ from "jquery";
import "select2";
import Select2Promise from '../models/Select2Promise';

export default {
  props: {
    value: {
      type: Array | Object | String | null,
      required: true
    },
    options: {
      type: Array | Select2Promise | null,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    loading: {
      type: Boolean,
      required: false,
      default: null
    },
    allowClear: {
      type: Boolean,
      required: false,
      default: true
    },
    hideSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    selectFirst: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    tags: {
      type: Boolean,
      required: false,
      default: false
    },
    tokenSeparators: {
      type: Array,
      required: false,
      default() {
        return [",", " "];
      }
    },
    dropdown: {
      type: Boolean,
      default: true,
      required: false
    },
    labelProperty: {
      type: String,
      default: "text",
      required: false
    }
  },

  computed: {
    selected() {
      if (this.multiple) {
        return this.value && this.value.length ? this.value.map(e => e.id) : [];
      } else {
        return this.value ? this.value.id : null;
      }
    },
    isXhr() {
      return this.options instanceof Select2Promise;
    }
  },

  mounted() {
    const params = {
      placeholder: this.placeholder,
      allowClear: this.allowClear,
      multiple: this.multiple,
      tags: this.tags,
      tokenSeparators: this.multiple ? this.tokenSeparators : [],
      selectOnClose: this.tags
    };

    if (this.hideSearch) {
      params["minimumResultsForSearch"] = Infinity;
    }

    if (this.isXhr) {
      params["ajax"] = this.options;
    }

    const select2Element = $(this.$el);
    select2Element
      .select2(params)
      .on("select2:select", e => {
        const id = e.params ? e.params.data.id : null;

        let option = {};

        if (this.options.result) {
          const options = this.isXhr
            ? this.options.result.results
            : this.options;
          option = options.find(element => {
            return element.id == id;
          });
        } else if (this.isXhr && this.value) {
          option = this.value;
          $(this.$el)
            .val(option.id)
            .trigger("change");
          this.$emit("input", option);
        } else {
          option = this.options.find(element => {
            return element.id == id;
          });
        }

        if (this.multiple) {
          if (!id) {
            return;
          }
          option = option || { id: id, name: id };
          const values = [...this.value];
          values.push(option);
          this.$emit("input", values);
        } else {
          this.$emit("input", option);
        }
        this.$nextTick(() => {
          select2Element
            .parent()
            .find(".select2-search__field")
            .focus();
        });
      })
      .on("select2:opening", e => {
        if (!this.dropdown) {
          document.body.classList.add("select2-disable-dropdown");
        }
        this.$emit("opening");
      })
      .on("select2:closing", e => {
        if (!this.dropdown) {
          document.body.classList.remove("select2-disable-dropdown");
        }
        this.$emit("closing");
      })
      .on("select2:unselect", e => {
        const id = e.params ? e.params.data.id : null;
        if (this.multiple) {
          const index = this.value.findIndex(e => e.id == id);
          const values = [...this.value];
          if (index !== -1) {
            values.splice(index, 1);
          }
          this.$emit("input", values);
        } else {
          this.$emit("input", null);
        }
      });

    if (this.loading) {
      this.updateLoading();
    }

    if (this.selectFirst && this.options.length) {
      const option = this.options[0];
      $(this.$el)
        .val(option.id)
        .trigger("change");

      this.$emit("input", option);
    } else {
      if (this.multiple) {
        $(this.$el)
          .val(this.selected)
          .trigger("change");
      } else {
        if (this.value && this.value.id) {
          const option = new Option(
            this.value[this.labelProperty],
            this.value.id,
            true,
            true
          );
          $(this.$el)
            .append(option)
            .trigger("change");
        }
      }
    }
  },

  watch: {
    value(value) {
      this.$nextTick(() => {
        $(this.$el)
          .val(this.selected)
          .trigger("change");
      });
      if (this.selectFirst && this.options.length) {
        const option = this.options[0];
        $(this.$el)
          .val(option.id)
          .trigger("change");

        this.$emit("input", option);
      } else {
        if (this.multiple) {
          $(this.$el)
            .val(this.selected)
            .trigger("change");
        } else {
          if (this.value && this.value.id) {
            var option = new Option(
              this.value[this.labelProperty],
              this.value.id,
              true,
              true
            );
            $(this.$el)
              .append(option)
              .trigger("change");
          }
        }
      }
    },
    loading(value) {
      this.updateLoading();
    }
  },

  methods: {
    updateValue() {
      $(this.$el)
        .val(this.selected)
        .trigger("select2:select");
    },

    updateLoading() {
      $(this.$el).prop("disabled", this.loading);
      if (this.loading) {
        $($(this.$el).data("select2").$container).addClass("loading");
      } else {
        $($(this.$el).data("select2").$container).removeClass("loading");
      }
    }
  },

  destroyed() {
    $(this.$el)
      .off()
      .select2("destroy");
  }
};
</script>

<style lang="scss">
.select2-disable-dropdown {
  .select2-dropdown {
    display: none !important;
  }
}
</style>
