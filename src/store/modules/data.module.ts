import { IFact } from "@app/interfaces/fact.interface";
import { IList } from "@app/interfaces/list.interface";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true, name: "data-module" })
class DataModule extends VuexModule {
  data: IList<IFact> = { total: 0, result: [] };
  searchTerm = "";

  // ========== MUTATIONS ========== //
  @Mutation
  setData(data: IList<IFact>): void {
    this.data = data;
  }
  @Mutation
  setSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  // ========== ACTIONS ========== //
  @Action
  updateData(data: IList<IFact>): void {
    this.context.commit("setData", data);
  }
  @Action
  updateSearchTerm(searchTerm: string): void {
    this.context.commit("setSearchTerm", searchTerm);
  }
}
export default DataModule;
