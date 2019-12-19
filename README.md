# @monade/vue-components

A collection of vue components by @monade

## List of components

### DataTable
A simple data table component, with loading

TODO

Dependencies:
- Bootstrap 4

### Paginator
A paginator component.

#### Usage
```html
<paginator :meta="metaObject" :range="5" :loading="true|false" @change="onPageChange"></paginator>
```

#### Parameters

Meta:
```javascript
{
  totalPages: number,
  lastPage: number,
  previousPage: number|undefined,
  nextPage: number|undefined,
  currentPage: number,
}
```

#### Events

* change: `(page) => {}`

#### Slots
* right-arrow: overrides the right icon
* left-arrow: overrides the left icon

#### Dependencies
- Bootstrap 4

### Select2
A select2 wrapper

TODO

#### Dependencies:
- Bootstrap 4
- Select2
- JQuery


## TODO:
- Documentation
- d.ts files
- Tests
