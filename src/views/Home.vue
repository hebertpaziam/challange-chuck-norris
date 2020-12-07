<style scoped lang="scss">
.home {
  &__brand {
    width: 90%;
    max-width: 320px;
    margin: auto;
    transform: translateZ(0);
    backface-visibility: hidden;

    &:hover,
    &:focus {
      animation-name: buzz;
      animation-duration: 0.75s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
    }
  }
}
</style>
<template>
  <main class="home">
    <figure class="home__brand">
      <img alt="Chuck Norris Logo" src="/images/logo.png" />
    </figure>
    <Search />
    <FeelingLucky />
    <Categories />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import Categories from '@/components/Categories.vue';
import FeelingLucky from '@/components/FeelingLucky.vue';
import Search from '@/components/Search.vue';

const DataModule = namespace('DataModule');
@Component({
  components: { Categories, FeelingLucky, Search }
})
export default class Home extends Vue {
  @DataModule.Action
  clearFacts!: () => Promise<void>;

  created() {
    this.clearFacts();
  }
}
</script>
