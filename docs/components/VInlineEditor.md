# DataTable
Inline multi-type input.

## Dependencies:
- Bootstrap 4

## Usage
```html
  <v-inline-editor :value="IVvalue" :placeholder="IVplaceholder" max-length="10" :uppercase="false"/>
```

```html
  <v-inline-editor :value="IVvalue" :placeholder="IVplaceholder" max-length="10" :uppercase="true"/>
```

## Parameters
| Name            | Schema                     | Description                                 | Required | Default  |
|-----------------|----------------------------|---------------------------------------------|----------|----------|
| `value`         | string | NestedDictionary  | v-model enabler                             |
| `suffix`        | string                     |                                             |
| `type`          | string                     | 'number' | 'text' | 'password' | 'email'    |   
| `placeholder`   | string                     |                                             |
| `maxLength`     | boolean                    |                                             |
| `uppercase`     | boolean                    | set to true to see output in uppercase      |
| `inputClasses`  | string                     | inputs css classes                          |
| `textArea`      | string                     | set to true to use a <text-area>            |
| `dataKeys`      | string[]                   | specify keys if input is not a simple string|
| `inputOnly`     | boolean                    | set to true to let it be a classic input    |
| `disabled`      | boolean                    | set to true to disable the input            |
| `regExp`        | RegExp                     | 
| `formatter`     | DataFormatter              | 

## Events
| Name        | Output        | Description                                            |
|-------------|---------------|--------------------------------------------------------|
| `@shown`    | none          | Triggered when the modal shows                         |
| `@hidden`   | none          | Triggered when the modal hides                         |


```

