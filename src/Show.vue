<template>
  <div id="app">
    <main>
      <styleguide></styleguide>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Styleguide from './styleguide/Styleguide.vue';

@Component({ components: { Styleguide } })
export default class Show extends Vue {

}

</script>
<style scoped>
@import'~bootstrap/dist/css/bootstrap.css'

</style>
