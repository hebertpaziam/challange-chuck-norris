<style scoped lang="scss">
.categories {
  &__container {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    place-content: center;
    width: 90%;
    max-width: 670px;
    margin: 38px auto auto auto;
  }

  &__item {
    display: block;
    margin: 5px;
    padding: 3px 8px;
    border-radius: 25px;
    border: 1px solid var(--primary-color);
    transition: all 150ms ease;
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
  <div class="categories">
    <div class="categories__container">
      <button
        class="categories__item"
        type="button"
        v-for="category in data"
        :key="category"
        @click.prevent="requestRandomFactByCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const DataModule = namespace('DataModule');

@Component
export default class Categories extends Vue {
  @DataModule.State('categories')
  data!: Array<string>;

  @DataModule.Action
  requestRandomFactByCategory!: (category: string) => void;
}
</script>
