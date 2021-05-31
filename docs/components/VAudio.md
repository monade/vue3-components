# VAudio

Audio player

## Dependencies:

- Bootstrap 4

## Usage

```html
<v-audio
  :sources="['https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3']"
  :timeout="60000"
/>
```

## Parameters

| Name            | Schema   | Required | Default |
| --------------- | -------- | -------- | ------- |
| `sources`       | string[] | no       | []      |
| `timeout`       | number   | no       | 1000    |
| `canPause`      | boolean  | no       | false   |
| `playingColor`  | string   | no       | #9FABBC |
| `contrastColor` | string   | no       | white   |
