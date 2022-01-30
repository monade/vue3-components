# VModal
Component to make modals.

## Dependencies:
- Bootstrap 4

## Usage
```html
  <v-modal ref="modal">
    <template v-slot:header>
      <div>Header</div>
    </template>
    <template v-slot><p>Body</p></template>
    <template v-slot:footer><div>Footer</div></template>
  </v-modal>
```

## Parameters
| Name              | Schema           | Description                                |          | Required | Default  |
|-------------------|------------------|--------------------------------------------|----------|----------|----------|
| `contentClasses`  | string           | classes for the whole modal                |          |    no    | ''       |
| `headerClasses`   | string           | classes for the header                     |          |    no    | ''       |
| `bodyClasses`     | string           | classes for the body                       |          |    no    | ''       |
| `footerClasses`   | string           | classes for the footer                     |          |    no    | ''       |
| `hidesOnClickOut` | boolean          | set to true to hide the modal on clickout  |          |    no    | true     |
| `size`            | string           | modal size: 'sm' - 'md' - 'lg'             |          |    no    | 'md'     |

## Events
| Name        | Output        | Description                                            |
|-------------|---------------|--------------------------------------------------------|
| `@shown`    | none          | Triggered when the modal shows                         |
| `@hidden`   | none          | Triggered when the modal hides                         |


```

