<template>
  <div id="app">
    <main>
      <styleguide></styleguide>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import Styleguide from './styleguide/Styleguide.vue';

@Component({ components: { Styleguide } })
export default class Show extends Vue {

}

</script>
