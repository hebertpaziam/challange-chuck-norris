import { IFact } from '@/interfaces/fact.interface';
import { IList } from '@/interfaces/list.interface';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({ namespaced: true })
class DataModule extends VuexModule {
  categories: Array<string> = [];
  searchResult: IList<IFact> = { total: 0, result: [] };

  // ========== MUTATIONS ========== //
  @Mutation
  fetchCategories() {
    fetch(`https://api.chucknorris.io/jokes/categories`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => {
        this.categories = data;
      });
  }

  @Mutation
  fetchRandomFact(category?: string) {
    fetch(`https://api.chucknorris.io/jokes/random${category ? `?category=${category}` : ''}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => {
        this.searchResult = { total: 1, result: [data] };
      });
  }

  @Mutation
  fetchFactsByQuery(query: string) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error(response.statusText);
      })
      .then((data) => {
        this.searchResult = data;
      });
  }

  // ========== ACTIONS ========== //
  @Action
  requestCategories(): void {
    this.context.commit('fetchCategories');
  }

  @Action
  requestRandomFact(): void {
    this.context.commit('fetchRandomFact', null);
  }

  @Action
  requestRandomFactByCategory(category: string): void {
    this.context.commit('fetchRandomFact', category);
  }

  @Action
  requestFactByQuery(query: string): void {
    this.context.commit('fetchFactsByQuery', query);
  }
}
export default DataModule;
