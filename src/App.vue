<style lang="scss">
@import '@/styles/main.scss';

footer {
  min-height: 100px;
}
</style>

<template>
  <div class="app">
    <header></header>

    <router-view />

    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>
