<style scoped lang="scss">
.search {
  &__group {
    position: relative;
    display: flex;
    place-items: stretch;
    place-content: center;
    width: 90%;
    max-width: 560px;
    height: 44px;
    margin: auto;
  }

  &__control {
    display: block;
    width: 100%;
    padding: 0 22px;
    border: 1px solid transparent;
    border-radius: var(--radius-default);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
    transition: var(--transition-default);

    &:focus,
    &:active,
    &:hover {
      outline: none;
      border-color: rgba(32, 33, 36, 0.5);
    }
  }

  &__action {
    display: flex;
    place-items: center;
    place-content: center;
    width: 60px;
    border: 1px solid transparent;
    border-radius: var(--radius-default);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: 1px 1px 5px 0 rgba(32, 33, 36, 0.28);
    transition: var(--transition-default);

    &:focus,
    &:active,
    &:hover {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0px 0px 6px 0 var(--primary-color);
    }

    img {
      width: 20px;
    }
  }

  &__error {
    display: block;
    padding: 0 22px;
    margin-top: 1rem;
    text-align: center;
    color: var(--error-color);
  }
}
</style>
<template>
  <section class="search">
    <form @submit.prevent="submitForm">
      <div class="search__group">
        <input
          type="search"
          class="search__control"
          name="search-fact-input"
          minlength="3"
          maxlength="120"
          v-model="term"
          @input.prevent="checkErrors"
        />
        <button type="submit" class="search__action">
          <img src="/icons/search.svg" alt="Search Icon" />
        </button>
      </div>

      <div class="search__error" v-if="hasError">length must be between <strong>3</strong> and <strong>120</strong> characters</div>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const DataModule = namespace('DataModule');

@Component({})
export default class Search extends Vue {
  hasError: boolean = false;
  term: string = '';

  @DataModule.Action
  requestFactByQuery!: (query: string) => Promise<void>;

  @DataModule.Action
  requestRandomFact!: () => Promise<void>;

  checkErrors() {
    this.hasError = this.term.length < 3 || this.term.length > 120;
  }

  submitForm() {
    this.checkErrors();
    if (!this.hasError)
      this.requestFactByQuery(this.term).then(() => {
        this.$router.push({ path: '/facts' });
      });
  }
}
</script>
