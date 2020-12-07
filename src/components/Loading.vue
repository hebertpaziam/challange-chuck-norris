<style scoped lang="scss">
.loading {
  text-align: center;

  &__image {
    width: 95%;
    max-width: 380px;
    border-radius: var(--radius-default);
    animation: fadeIn cubic-bezier(0.75, 0, 1, 0) 3s;
  }
}
</style>
<template>
  <div class="loading">
    <h1>Loading...</h1>
    <figure class="loading__image">
      <img src="/images/waiting.jpg" alt="Chuck Norris doesn't sleep... he waits" />
    </figure>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Loading extends Vue {}
</script>
