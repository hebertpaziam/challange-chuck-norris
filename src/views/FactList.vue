<style scoped lang="scss">
.fact-list {
  &__headings {
    margin-bottom: 1rem;
    text-align: center;
  }

  &__card {
    width: 100%;
    margin: 0.5rem auto;
  }

  &__empty {
    width: 317px;
    img {
      border-radius: var(--radius-default);
    }
  }
}
</style>
<template>
  <main class="fact-list">
    <Loading v-if="this.facts.total === undefined" />
    <template v-else>
      <div class="fact-list__headings">
        <h1>{{ this.facts.total || 'No' }} {{ this.facts.total === 1 ? 'Fact' : 'Facts' }} Found</h1>
        <h2>related to "{{ term }}"</h2>
      </div>

      <ul v-if="facts.total > 0">
        <li class="fact-list__card" v-for="fact of facts.result" :key="fact.id">
          <CardBasic :fact="fact" />
        </li>
      </ul>

      <figure class="fact-list__empty" v-if="facts.total === 0">
        <img src="/images/disappointment.jpg" alt="Chuck Norris is disappointed" />
      </figure>
    </template>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import CardBasic from '@/components/CardBasic.vue';
import Search from '@/components/Search.vue';
import Loading from '@/components/Loading.vue';

import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';

const DataModule = namespace('DataModule');

@Component({
  components: { CardBasic, Search, Loading }
})
export default class FactList extends Vue {
  @DataModule.State
  facts!: IList<IFact>;

  @DataModule.Action
  requestFactByQuery!: (query: string) => Promise<void>;

  get term() {
    return this.$route.params.term;
  }

  created() {
    if (!this.term) this.$router.push({ name: 'home' });
  }

  mounted() {
    this.requestFactByQuery(this.term).catch(() => this.$router.push({ name: 'home' }));
  }
}
</script>
