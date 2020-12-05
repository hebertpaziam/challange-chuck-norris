<style lang="scss">
@import '@/styles/main.scss';

footer {
  min-height: 100px;
}
</style>

<template>
  <div class="app">
    <header>
      <Brand />
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

import Brand from '@/components/Brand.vue';

const DataModule = namespace('DataModule');

@Component({
  components: { Brand }
})
export default class Home extends Vue {
  @DataModule.Action
  requestCategories!: () => void;

  created() {
    this.requestCategories();
  }
}
</script>
