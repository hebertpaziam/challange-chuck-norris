import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';
import DataModule from '@/store/modules/data.module';
import { createLocalVue } from '@vue/test-utils';
import { date, image, internet, lorem, random } from 'faker';
import Vuex, { Commit, Dispatch } from 'vuex';

describe('Store/DataModule', () => {
  let store: any;
  let dispatch: Dispatch;
  let commit: Commit;

  const getState = () => store.state['DataModule'];

  const lengthDefault = random.number({ min: 1, max: 5 });
  const mockedCategories = Array.from({ length: lengthDefault }, lorem.word);
  const mockedFacts: IList<IFact> = {
    total: lengthDefault,
    result: Array.from({ length: lengthDefault }, () => ({
      categories: mockedCategories,
      created_at: date.past(),
      icon_url: image.imageUrl(60, 60, 'abstract'),
      id: random.uuid(),
      updated_at: date.recent(),
      value: lorem.paragraph(),
      url: internet.url()
    }))
  };
  const mockFetchResolve = (data: any, resolves: boolean) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: resolves,
      json: () => (resolves ? Promise.resolve(data) : Promise.reject())
    });
  };

  beforeEach(() => {
    createLocalVue().use(Vuex);

    store = new Vuex.Store({ modules: { DataModule } });
    dispatch = store.dispatch;
    commit = store.commit;
  });

  afterEach(() => {
    commit('DataModule/setCategories', []);
    commit('DataModule/setFacts', {});
  });

  describe('Mutations', () => {
    it('should set categories', () => {
      expect(getState().categories).toStrictEqual([]);
      commit('DataModule/setCategories', mockedCategories);
      expect(getState().categories).toStrictEqual(mockedCategories);
    });

    it('should set facts', () => {
      expect(getState().facts).toStrictEqual({});
      commit('DataModule/setFacts', mockedFacts);
      expect(getState().facts).toStrictEqual(mockedFacts);
    });

    it('should remove all facts', () => {
      commit('DataModule/setFacts', mockedFacts);
      expect(getState().facts).toStrictEqual(mockedFacts);

      commit('DataModule/removeFacts');
      expect(getState().facts).toStrictEqual({});
    });
  });

  describe('Actions', () => {
    it('should commit mutation to remove facts', () => {
      spyOn(store, 'commit');

      dispatch('DataModule/clearFacts');

      expect(store.commit).toHaveBeenCalledWith('DataModule/removeFacts', undefined, undefined);
    });

    it('should fetch categories and commit mutation to set categories', async () => {
      spyOn(store, 'commit');
      mockFetchResolve(mockedCategories, true);

      await dispatch('DataModule/requestCategories');
      expect(store.commit).toHaveBeenCalledWith('DataModule/setCategories', mockedCategories, undefined);
    });

    it('should not fetch categories if categories exists, just resolve action', async () => {
      commit('DataModule/setCategories', mockedCategories);
      expect(getState().categories).toStrictEqual(mockedCategories);

      spyOn(store, 'commit');

      await dispatch('DataModule/requestCategories');
      expect(store.commit).not.toHaveBeenCalled();
    });

    it('should fetch a random fact and commit mutation to set facts', async () => {
      const fact = mockedFacts.result[0];
      spyOn(store, 'commit');
      mockFetchResolve(fact, true);

      await dispatch('DataModule/requestRandomFact');
      expect(store.commit).toHaveBeenCalledWith('DataModule/setFacts', { total: 1, result: [fact] }, undefined);
    });

    it('should fetch a random fact by category and commit mutation to set facts', async () => {
      const fact = mockedFacts.result[0];
      spyOn(store, 'commit');
      mockFetchResolve(fact, true);

      await dispatch('DataModule/requestRandomFactByCategory');
      expect(store.commit).toHaveBeenCalledWith('DataModule/setFacts', { total: 1, result: [fact] }, undefined);
    });

    it('should fetch fact list related to query and commit mutation to set facts', async () => {
      const query = lorem.word();
      spyOn(store, 'commit');
      mockFetchResolve(mockedFacts, true);

      await dispatch('DataModule/requestFactByQuery', query);
      expect(store.commit).toHaveBeenCalledWith('DataModule/setFacts', mockedFacts, undefined);
    });

    it('should throw error if requests is failed', async () => {
      mockFetchResolve(mockedCategories, false);
      await expect(dispatch('DataModule/requestCategories')).rejects.toThrow();
      await expect(dispatch('DataModule/requestRandomFact')).rejects.toThrow();
      await expect(dispatch('DataModule/requestRandomFactByCategory')).rejects.toThrow();
      await expect(dispatch('DataModule/requestFactByQuery')).rejects.toThrow();
    });
  });
});
