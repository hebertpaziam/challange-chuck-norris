<style scoped lang="scss"></style>
<template>
  <div class="home">
    <Search />
    <Categories />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import Categories from '@/components/Categories.vue';
import Search from '@/components/Search.vue';

const DataModule = namespace('DataModule');

@Component({
  components: { Categories, Search }
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
