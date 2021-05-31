# DataTable
Color picker component.

## Dependencies:
- Bootstrap 4

## Usage
```html
  <v-color-picker :color="color" :colors="colors" />
```

```html
  <v-color-picker :color="color" :colors="colors" :columns="2"/>
```

## Parameters
| Name            | Schema           | Description                   |          | Required | Default  |
|-----------------|------------------|-------------------------------|----------|----------|----------|
| `color`         | string           | current color to be shown     |          |    no    | #ff0000  |
| `colors`        | string[]         | available colors              |          |    no    | []       |
| `columns`       | number           |                               |          |    no    | 1        |

## Events
| Name      | Output                                                    |
|-----------|-----------------------------------------------------------|
| `@change` | color: string                                             |


```

