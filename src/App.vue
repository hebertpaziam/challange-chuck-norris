<style lang="scss">
@import '@/styles/main.scss';

footer {
  min-height: 100px;
}
</style>

<template>
  <div class="app">
    <header>
      <Nav />
    </header>

    <main>
      <router-view />
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import Nav from '@/components/Nav.vue';

const DataModule = namespace('DataModule');

@Component({
  components: { Nav }
})
export default class Home extends Vue {
  @DataModule.Action
  requestCategories!: () => void;

  created() {
    this.requestCategories();
  }
}
</script>
