<style scoped lang="scss">
.card-basic {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &__content,
  &__footer,
  &__headings {
    display: flex;
    flex-direction: column;
    place-items: center;
    place-content: center;
  }

  &__headings {
    flex-direction: row;
    height: 20px;
    margin-bottom: 0.25rem;
  }

  &__footer {
    place-content: space-between;
    margin-top: 1rem;
  }

  &__badges {
    flex-direction: row;
    place-content: flex-start;
    width: auto;
  }

  &__badge {
    color: #fff;
    background-color: var(--primary-color);
    display: block;
    margin-right: 0.25rem;
    padding: 1px 6px;
    font-size: 0.875rem;
    border-radius: var(--radius-default);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  }

  &__source {
    white-space: nowrap;
    margin-right: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  &__message {
    width: 100%;
  }

  &__icon {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
    margin-right: 0.25rem;

    img {
      width: auto;
    }
  }

  @media (min-width: 601px) {
    text-align: left;

    &__content,
    &__footer {
      display: flex;
      flex-direction: row;
      place-items: flex-start;
    }
    &__headings {
      place-content: space-between;
      margin-bottom: 1rem;
    }
  }
}
</style>
<template>
  <article class="card-basic">
    <div class="card-basic__headings">
      <a class="card-basic__source" :href="fact.url" target="_blank">
        <small>#{{ fact.id }}</small>
      </a>
      <ul class="card-basic__badges">
        <li class="card-basic__badge" v-for="category of fact.categories" :key="category">{{ category }}</li>
      </ul>
    </div>

    <div class="card-basic__content">
      <figure class="card-basic__icon">
        <img :src="fact.icon_url" alt="Fact Icon" rel="noopener noreferrer" />
      </figure>
      <blockquote class="card-basic__message" :cite="this.fact.url">
        {{ fact.value }}
      </blockquote>
    </div>

    <div class="card-basic__footer">
      <small>created at: {{ formatDate(fact.created_at) }}</small>
      <small>updated at: {{ formatDate(fact.updated_at) }}</small>
    </div>
  </article>
</template>

<script lang="ts">
import IFact from '@/interfaces/fact.interface';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CardBasic extends Vue {
  @Prop({ required: true }) readonly fact!: IFact;

  formatDate(date: Date) {
    const { locale, timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return new Date(date).toLocaleString(locale, { timeZone });
  }
}
</script>
