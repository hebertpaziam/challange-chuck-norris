<style scoped lang="scss">
.home {
  &__control {
    position: relative;
    width: 90%;
    max-width: 700px;
    margin: auto;

    &:before {
      content: '';
      position: absolute;
      display: block;
      top: 12px;
      left: 15px;
      width: 20px;
      height: 20px;
      background-image: url('/icons/search.svg');
    }
  }
  &__search {
    display: block;
    width: 100%;
    height: 44px;
    padding: 0 44px;
    border: 1px solid transparent;
    border-radius: 22px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    transition: all 150ms ease;

    &:focus,
    &:active,
    &:hover {
      outline: none;
      border-color: rgba(32, 33, 36, 0.5);
    }
  }
  &__error {
    display: block;
    margin-top: 10px;
    padding: 0 44px;
    text-align: center;
    color: var(--error-color);
  }
}
</style>
<template>
  <div class="home">
    <form>
      <div class="home__control">
        <input class="home__search" type="text" minlength="3" maxlength="120" v-model="searchTerm" @input.prevent="submitForm" />
        <div class="home__error" v-if="hasError">length must be between 3 and 120 characters</div>
      </div>
    </form>
    <Categories />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import Categories from '@/components/Categories.vue';

const DataModule = namespace('DataModule');

@Component({
  components: { Categories }
})
export default class Home extends Vue {
  hasError: boolean = false;
  searchTerm: string = '';
  timeout: any;

  @DataModule.Action
  requestFactByQuery!: (query: string) => void;

  submitForm() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.searchTerm.length >= 3 && this.searchTerm.length <= 120) {
        this.hasError = false;
        this.requestFactByQuery(this.searchTerm);
      } else {
        this.hasError = true;
      }
    }, 400);
  }
}
</script>
