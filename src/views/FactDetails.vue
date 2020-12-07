<style scoped lang="scss">
.fact-details {
  &__title {
    text-align: center;

    &--open-fire {
      padding: 3rem 2rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('/images/fire.gif');
    }
  }
  &__message {
    font-size: 30px;
    text-align: center;
    margin-bottom: 2rem;
  }

  &__icon {
    width: 60px;
    height: 60px;
    margin: 0.5rem auto auto;
  }

  &__definition {
    display: flex;
    flex-direction: column;
    place-items: center;
    place-content: center;
    width: 100%;
    max-width: 320px;
    padding: 1rem;
    border-radius: var(--radius-default);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    a {
      color: inherit;
      font-family: inherit;
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__info {
    width: 100%;
    margin: 0.25rem auto;

    dt {
      font-weight: bold;
    }
  }
}
</style>
<template>
  <main class="fact-details">
    <Loading v-if="!this.fact.id" />
    <template v-else>
      <h1 class="fact-details__title" :class="{ 'fact-details__title--open-fire': isOpenFire }">Random Fact</h1>
      <blockquote class="fact-details__message" :cite="this.fact.url">
        {{ this.fact.value }}
      </blockquote>

      <dl class="fact-details__definition">
        <h2>Details</h2>
        <figure class="fact-details__icon">
          <img :src="this.fact.icon_url" alt="Fact Icon" target="_blank" rel="noopener noreferrer" />
        </figure>
        <div class="fact-details__info">
          <dt>Source</dt>
          <dd>
            <a :href="this.fact.url">#{{ this.fact.id }}</a>
          </dd>
        </div>

        <div class="fact-details__info" v-if="categories.length">
          <dt>Categories</dt>
          <dd>{{ this.categories }}</dd>
        </div>

        <div class="fact-details__info">
          <dt>created at</dt>
          <dd>{{ this.formatDate(this.fact.created_at) }}</dd>
        </div>

        <div class="fact-details__info">
          <dt>updated at</dt>
          <dd>{{ this.formatDate(this.fact.updated_at) }}</dd>
        </div>
      </dl>
    </template>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import Loading from '@/components/Loading.vue';
import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';

const DataModule = namespace('DataModule');

@Component({ components: { Loading } })
export default class FactDetails extends Vue {
  @DataModule.State
  facts!: IList<IFact>;

  @DataModule.Action
  requestRandomFact!: () => Promise<void>;

  @DataModule.Action
  requestRandomFactByCategory!: (category: string) => Promise<void>;

  get categories() {
    return [...this.fact.categories].join(', ');
  }

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

  formatDate(date: Date) {
    const { day, month, year, timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return Intl.DateTimeFormat(undefined, {
      day,
      month,
      year,
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(date));
  }
}
</script>
