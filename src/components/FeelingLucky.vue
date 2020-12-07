<style scoped lang="scss">
.feeling-lucky {
  &__action {
    display: flex;
    place-items: center;
    place-content: center;
    border: 1px solid rgba(32, 33, 36, 0);
    border-radius: 4px;
    transition: var(--transition-default);
    transition-duration: 300ms;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    img {
      opacity: 0;
      width: 20px;
      margin-bottom: 1px;
      transition: inherit;
      transform: translateY(-3px);
    }

    &:focus,
    &:active,
    &:hover {
      color: var(--primary-color);
      font-weight: bold;
      padding: 0 22px;
      outline: none;
      box-shadow: 0 3px 1px -2px var(--primary-color), 0 2px 2px 0 var(--primary-color), 0 1px 5px 0 var(--primary-color);

      img {
        opacity: 1;
      }
    }
  }
}
</style>
<template>
  <section class="feeling-lucky">
    <button class="feeling-lucky__action" type="button" @click.prevent="redirectToFact">
      <img src="/icons/fire.gif" alt="Search Icon" />
      I'm feeling like Norris
      <img src="/icons/fire.gif" alt="Search Icon" />
    </button>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FeelingLucky extends Vue {
  redirectToFact() {
    this.$router.push({ name: 'fact-details' });
  }
}
</script>
