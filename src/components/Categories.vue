<style scoped lang="scss">
.categories {
  width: 90%;
  max-width: 560px;
  text-align: center;

  &__container {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    place-content: center;
    margin-top: 1rem;
  }

  &__item {
    display: block;
    margin: 0.5rem;
    padding: 3px 8px;
    border-radius: var(--radius-default);
    border: 2px solid var(--primary-color);
    transition: var(--transition-default);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 1px 3px 0 rgba(0, 0, 0, 0.06);

    &:focus,
    &:active,
    &:hover {
      outline: none;
      box-shadow: 0 8px 4px -4px rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.14), 0 4px 6px 0 rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
<template>
  <section class="categories">
    <h2>Get a random fact by category</h2>
    <div class="categories__container">
      <button class="categories__item" type="button" v-for="category in data" :key="category" @click.prevent="redirectToFact(category)">
        {{ category }}
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const DataModule = namespace('DataModule');

@Component
export default class Categories extends Vue {
  @DataModule.State('categories') data!: Array<string>;

  @DataModule.Action
  requestCategories!: () => Promise<void>;

  created() {
    this.requestCategories();
  }

  redirectToFact(category: string) {
    this.$router.push({ name: 'fact-details', query: { category } });
  }
}
</script>
