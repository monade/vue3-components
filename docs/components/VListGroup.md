# VListGroup
Unordered list with features.

## Dependencies:
- Bootstrap 4

## Usage
```html
<v-list-group :items="Vitems">
  <template #item="slotProps">
    <span>{{slotProps.value.label}}</span>
  </template>
</v-list-group>
```

## Parameters
| Name              | Schema                | Description                               | Required | Default |
|-------------------|-----------------------|-------------------------------------------|----------|---------|
| `items`           | Array<VListGroupItem> | Items to display                          | no       |         |
| `ordered`         | boolean               | set to true to display the order          | no       | false   |
| `selectable`      | boolean               | Set to true to emit the selected item     | no       | false   |
| `isHighlighted`   | Function              |                                           | no       |         |
| `isOver`          | Function              |                                           | no       |         |

## Events
| Name        | Output                     | Description                                            |
|-------------|----------------------------|--------------------------------------------------------|
| `@selected` | VListGroupItem & number    | Triggered on item selected                             |
| `@over`     | VListGroupItem | undefined | Triggered on mouse hover                               |


```

