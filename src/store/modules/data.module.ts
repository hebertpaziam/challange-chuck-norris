import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

const get = (url: string) => {
  return fetch(url).then((response) => {
    if (response.ok) return response.json();
    else return Promise.reject(response.statusText);
  });
};

@Module({ namespaced: true })
export default class DataModule extends VuexModule {
  categories: Array<string> = [];
  facts: IList<IFact> = {} as IList<IFact>;

  // ========== MUTATIONS ========== //
  @Mutation
  setCategories(categories: Array<string>) {
    this.categories = categories;
  }

  @Mutation
  setFacts(result: IList<IFact>) {
    this.facts = result;
  }

  @Mutation
  removeFacts() {
    this.facts = {} as IList<IFact>;
  }

  // ========== ACTIONS ========== //
  @Action
  clearFacts() {
    this.context.commit('removeFacts');
  }

  @Action
  requestCategories() {
    if (this.categories.length > 0) return Promise.resolve();
    else
      return get(`https://api.chucknorris.io/jokes/categories`).then((data) => {
        this.context.commit('setCategories', data);
      });
  }

  @Action
  requestRandomFact() {
    return get(`https://api.chucknorris.io/jokes/random`).then((data) => {
      this.context.commit('setFacts', { total: 1, result: [data] });
    });
  }

  @Action
  requestRandomFactByCategory(category: string) {
    return get(`https://api.chucknorris.io/jokes/random?category=${category}`).then((data) =>
      this.context.commit('setFacts', { total: 1, result: [data] })
    );
  }

  @Action
  requestFactByQuery(query: string) {
    return get(`https://api.chucknorris.io/jokes/search?query=${query}`).then((data) => {
      this.context.commit('setFacts', data);
    });
  }
}
