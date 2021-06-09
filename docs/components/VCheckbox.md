# VCheckbox

Checkbox

## Dependencies:

- Bootstrap 4

## Usage

```html
<v-checkbox
label="Label"
:value="vcheckboxVariable"

></v-checkbox>
```
or with label as a slot

```html
<v-checkbox
:value="vcheckboxVariable"

><b>Strong label</b></v-checkbox>
```

## Parameters

| Name            | Schema   | Required | Default |
| --------------- | -------- | -------- | ------- |
| `label`         | string   | no       | ''      |
| `v-model`       | boolean  | yes      |    /    |

## Slots

| Name            | Where         |
| --------------- | ------------- |
| `default`       | Checkbox Label|
