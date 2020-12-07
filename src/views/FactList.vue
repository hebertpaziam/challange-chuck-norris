<style scoped lang="scss">
.fact-list {
  padding: 1rem;
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

  &__loading {
    text-align: center;
    img {
      border-radius: var(--radius-default);
      animation: fadeIn cubic-bezier(0.75, 0, 1, 0) 3s;
    }
  }
}
</style>
<template>
  <main class="fact-list">
    <div class="fact-list__loading" v-if="this.facts.total === undefined">
      <h1>Loading...</h1>
      <figure class="fact-list__loading">
        <img src="/images/waiting.jpg" alt="Chuck Norris doesn't sleep... he waits" />
      </figure>
    </div>

    <template v-else>
      <div class="fact-list__headings">
        <h1>{{ this.facts.total || 'No' }} {{ this.facts.total === 1 ? 'Fact' : 'Facts' }} Found</h1>
        <h2>related to "{{ term }}"</h2>
      </div>

      <ul v-if="facts.total > 0">
        <li class="fact-list__card" v-for="fact of facts.result" :key="fact.id">
          <Card :fact="fact" />
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

import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';

import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';

const DataModule = namespace('DataModule');

@Component({
  components: { Card, Search }
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
