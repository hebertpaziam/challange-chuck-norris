<style scoped lang="scss">
.fact-details {
  &__title {
    text-align: center;

    &--open-fire {
      padding: 2rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('/images/fire.gif');
    }
  }
}
</style>
<template>
  <main class="fact-details">
    <Loading v-if="!this.fact.id" />
    <template v-else>
      <h1 class="fact-details__title" :class="{ 'fact-details__title--open-fire': isOpenFire }">Random Fact</h1>
      <CardDetailed :fact="this.fact" />
    </template>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import CardDetailed from '@/components/CardDetailed.vue';
import Loading from '@/components/Loading.vue';
import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';

const DataModule = namespace('DataModule');

@Component({
  components: { CardDetailed, Loading }
})
export default class FactDetails extends Vue {
  @DataModule.State
  facts!: IList<IFact>;

  @DataModule.Action
  requestRandomFact!: () => Promise<void>;

  @DataModule.Action
  requestRandomFactByCategory!: (category: string) => Promise<void>;

  get isOpenFire() {
    return this.$route.query.category ? false : true;
  }

  get fact(): IFact {
    try {
      return this.facts.result[0];
    } catch (error) {
      return {} as IFact;
    }
  }

  created() {
    const { category } = this.$route.query;
    const promise = category ? this.requestRandomFactByCategory(category as string) : this.requestRandomFact();
    promise.catch(() => this.$router.push({ name: 'home' }));
  }
}
</script>
