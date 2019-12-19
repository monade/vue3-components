
# Paginator
A paginator component.

## Usage
```html
<paginator :meta="metaObject" :range="5" :loading="true|false" @change="onPageChange"></paginator>
```

## Parameters

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

## Events

* change: `(page) => {}`

## Slots
* `right-arrow`: overrides the right icon
* `left-arrow`: overrides the left icon

## Dependencies
- Bootstrap 4
