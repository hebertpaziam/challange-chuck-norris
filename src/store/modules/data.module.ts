import { IFact } from '@/interfaces/fact.interface';
import { IList } from '@/interfaces/list.interface';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class DataModule extends VuexModule {
  categories: Array<string> = [];
  facts: IList<IFact> = { total: 0, result: [] };

  // ========== MUTATIONS ========== //
  @Mutation
  setCategories(categories: Array<string>) {
    this.categories = categories;
  }

  @Mutation
  setFacts(result: IList<IFact>) {
    this.facts = result;
  }

  // ========== ACTIONS ========== //
  @Action
  requestCategories() {
    return fetch(`https://api.chucknorris.io/jokes/categories`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => this.context.commit('setCategories', data));
  }

  @Action
  requestRandomFact() {
    return fetch(`https://api.chucknorris.io/jokes/random`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => this.context.commit('setFacts', { total: 1, result: [data] }));
  }

  @Action
  requestRandomFactByCategory(category: string) {
    return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => this.context.commit('setFacts', { total: 1, result: [data] }));
  }

  @Action
  requestFactByQuery(query: string) {
    return fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => this.context.commit('setFacts', data));
  }
}
