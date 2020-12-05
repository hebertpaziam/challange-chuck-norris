<style lang="scss" scoped>
.nav {
  padding: 30px 0 0 0;

  &__brand {
    position: relative;
    display: block;
    width: 320px;
    margin: auto auto 38px auto;
    transform: translateZ(0);
    backface-visibility: hidden;

    &:hover,
    &:focus {
      animation-name: buzz;
      animation-duration: 0.75s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
    }
  }
}
</style>

<template>
  <nav class="nav">
    <router-link class="nav__brand" to="/">
      <figure>
        <img alt="Chuck Norris Logo" src="/images/logo.png" />
      </figure>
    </router-link>
  </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Nav extends Vue {}
</script>
