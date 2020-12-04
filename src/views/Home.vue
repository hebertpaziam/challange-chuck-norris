<template>
  <div class="home">
    <img alt="Vue logo" src="/images/logo-chucknorris.png" />
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@app/components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
