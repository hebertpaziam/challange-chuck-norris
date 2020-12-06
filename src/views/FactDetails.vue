<style scoped lang="scss">
.fact-details {
}
</style>
<template>
  <main class="fact-details"></main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';

const DataModule = namespace('DataModule');

@Component({})
export default class FactDetails extends Vue {
  @DataModule.State
  facts!: IList<IFact>;

  created() {
    if (!this.facts.total) this.$router.push({ name: 'home' });
  }
}
</script>
