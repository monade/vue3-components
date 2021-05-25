# DataTable

Audio player wrapper

## Dependencies:

- Bootstrap 4

## Usage

```html
 <v-audio-element-wrapper
          :can-pause="true"
          :time-out="1000"
          :sources="sources"
          @error="errorHandler"
          @timeupdate="timeupdateHandler"
          @timedout="timedOutHandler"
          @paused="pausedHandler"
        />
```

## Parameters

| Name            | Schema   | Required | Default |
| --------------- | -------- | -------- | ------- |
| `sources`       | string[] | no       | []      |
| `timeout`       | number   | no       | 1000    |
| `canPause`      | boolean  | no       | false   |

## Events

| Name                  | Output   |
| --------------------- | -------- |
| `@error`               | void     |
| `@timeupdate`          | number   |
| `@timedout`            | void     |
| `@paused`              | void     |
