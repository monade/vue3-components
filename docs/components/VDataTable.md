# DataTable
Dynamic table component.

## Dependencies:
- Bootstrap 4

## Usage
```html
  <v-data-table :columns="columns" :values="values" :sortable="true" :loading="false"/>
```

```html
  <v-data-table :columns="columns" :values="values" :sortable="true" :loading="false">
    <template v-slot:actions>
      <button type="button" class="btn btn-primary btn-sm">Save</button>
    </template>
  </v-data-table>
```

```html
  <v-data-table :columns="DTScolumns" :values="DTvalues" :sortable="true" :loading="false">
    <template v-slot:actions>
      <button type="button" class="btn btn-primary btn-sm">Save</button>
    </template>
  </v-data-table>
```

## Interfaces
```typescript
  interface ColumnData {
    sortable: boolean;
    sort: string;
    name: string;
    class: string;
    default: string;
    label: string;
  }
```

## Parameters
| Name            | Schema           | Description                           |          | Required | Default  |
|-----------------|------------------|---------------------------------------|----------|----------|----------|
| `columns`       | ColumnData[]     | The cols of the table                 |          |    yes   | #ff0000  |
| `tableClasses`  | string           | classes to assign to the table        |          |    no    | []       |
| `values`        | any[]            | Table's data                          |          |    no    | 1        |
| `sort`          | string           | Specify each field's sort             |          |    no    | 1        |
| `sortable`      | boolean          | Whether the table is sortable or not  |          |    no    | true     |
| `loading`       | boolean          | Use this to show that data is loading |          |    no    | true     |

## Events
| Name        | Output        | Description                                            |
|-------------|---------------|--------------------------------------------------------|
| `@selected` | value: any    | Selected value                                         |
| `@sorted`   | sort: string  | Use this to retrieve new data based on the sort value  |


```

