# DataTable
A simple data table component, with loading

## Dependencies:
- Bootstrap 4

## Usage
```html
<data-table :columns="columns" :values="data" :loading="loading" @sorted="onSorted" @selected="onSelected"></data-table>
```

## Parameters
| Name      | Schema                                                    | Required |
|-----------|-----------------------------------------------------------|----------|
| `columns` | [ { name: string, label: string, sortable: boolean } ]    | yes      |
| `values`  | [ your values, having all the keys defined in "columns" ] | yes      |
| `loading` | boolean                                                   | no       |

## Events
TODO

## Slots
TODO

## More information

A special class `content-loading` is injected everytime loading becomes `true`.

You can style it like this:

```scss
.content-loading {
  position: relative;
  min-height: 240px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 100;
  }
  > .loading-label {
    display: initial;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
  }
}
```
