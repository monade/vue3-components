# DataTable
Component to handle pagination on lists.

## Dependencies:
- Bootstrap 4

## Usage
```html
  <v-paginator meta="meta" range="2" align="center"></v-paginator>
```

```html
  <v-paginator meta="meta" :range="2" align="center">
    <template v-slot:left-arrow>
      <span class="small">Prev</span>
    </template>
    <template v-slot:right-arrow>
      <span class="small">Next</span>
    </template>
  </v-paginator>
```

## Parameters
| Name            | Schema           | Description                   |          | Required | Default  |
|-----------------|------------------|-------------------------------|----------|----------|----------|
| `meta`          | obj              | Meta returned from the api    |          |    yes   |          |
| `range`         | number           |                               |          |    no    |  5       |
| `loading`       | boolean          |                               |          |    no    |  false   |
| `align`         | string | null    |                               |          |    no    |  null    |

## Events
| Name      | Output                                                    |
|-----------|-----------------------------------------------------------|
| `@change` | value: number                                             |


```

