<style scoped lang="scss">
.card-detailed {
  display: flex;
  flex-direction: column;
  place-items: center;
  place-content: center;

  padding: 1rem;
  border-radius: var(--radius-default);
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &__content {
    text-align: center;
  }

  &__message {
    margin-top: 1rem;
    font-size: 1.5rem;
  }

  &__divider {
    display: block;
    align-self: stretch;
    width: auto;
    min-width: 1px;
    min-height: 1px;
    background-color: #ddd;
    margin: 1rem 0;
  }

  &__definition {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
    max-width: 320px;

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

  &__icon {
    width: 60px;
    height: 60px;
    margin-top: 0.5rem;
  }

  &__info {
    width: 100%;
    margin: 0.25rem auto;

    dt {
      font-weight: bold;
    }
  }

  @media (min-width: 720px) {
    flex-direction: row;
    place-items: flex-start;

    &__divider {
      width: 1px;
      height: auto;
      margin: 0 1rem;
    }
  }
}
</style>
<template>
  <article class="card-detailed">
    <div class="card-detailed__content">
      <h2>Message</h2>
      <blockquote class="card-detailed__message" :cite="this.fact.url">{{ this.fact.value }}</blockquote>
    </div>

    <div class="card-detailed__divider"></div>

    <dl class="card-detailed__definition">
      <h2>Details</h2>
      <figure class="card-detailed__icon">
        <img :src="this.fact.icon_url" alt="Fact Icon" target="_blank" rel="noopener noreferrer" />
      </figure>
      <div class="card-detailed__info">
        <dt>Source</dt>
        <dd>
          <a :href="this.fact.url" alt="Fact source page">#{{ this.fact.id }}</a>
        </dd>
      </div>

      <div class="card-detailed__info" v-if="categories.length">
        <dt>Categories</dt>
        <dd>{{ this.categories }}</dd>
      </div>

      <div class="card-detailed__info">
        <dt>Created at</dt>
        <dd>{{ this.formatDate(this.fact.created_at) }}</dd>
      </div>

      <div class="card-detailed__info">
        <dt>Updated at</dt>
        <dd>{{ this.formatDate(this.fact.updated_at) }}</dd>
      </div>
    </dl>
  </article>
</template>

<script lang="ts">
import IFact from '@/interfaces/fact.interface';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CardDetailed extends Vue {
  @Prop({ required: true }) readonly fact!: IFact;

  get categories() {
    return [...this.fact.categories].join(', ');
  }

  formatDate(date: Date) {
    const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return new Date(date).toLocaleString(locale, { timeZone });
  }
}
</script>
