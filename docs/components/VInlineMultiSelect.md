# VInlineMultiSelect
Inline multi-select dropdown.

## Dependencies:
- Bootstrap 4

## Usage
```html
  <v-inline-multi-select :value="IMSvalues" :options="IMSoptions"></v-inline-multi-select>
```

## Parameters
| Name            | Schema                | Description                                 | Required | Default  |
|-----------------|-----------------------|---------------------------------------------|----------|----------|
| `value`         | any[] | null          | Input value                                 | no       | []
| `placeholder`   | string                | Input placeholder                           | no       | 
| `label`         | string                | Input's label                               | no       |
| `disabled`      | boolean               | Prop to disable the input                   | no       | false
| `showDropdown`  | boolean               | Prop to enable VMultiSelect showDropDown    | no       | false
| `searchEnabled` | boolean               | Prop to enable the search of the values     | no       | false
| `dataKeys`      | string[]              | Keys to describe the output object          | no       |
| `options`       | MultiSelectOption[]   | Multiselect options                         | yes      |

## Events
| Name        | Output        | Description                                                                |
|-------------|---------------|----------------------------------------------------------------------------|
| `@change`   | Object        | Triggered on a chosen value. Emits the object described with prop DataKeys |


```

