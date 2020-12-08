import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';
import DataModule from '@/store/modules/data.module';
import FactList from '@/views/FactList.vue';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import { date, image, internet, lorem, random } from 'faker';
import Vuex from 'vuex';

describe('FactList.vue', () => {
  let actions: any;
  let store: any;
  let wrapper: Wrapper<FactList>;
  let component: any;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mountComponent = (resolved: boolean, termParam?: string) => {
    actions = {
      requestFactByQuery: spyOn(DataModule.actions as any, 'requestFactByQuery').and.returnValue(
        resolved ? Promise.resolve() : Promise.reject()
      )
    };

    const factsNumber = 3;
    DataModule.state = {
      facts: {
        total: factsNumber,
        result: Array.from({ length: factsNumber }, () => ({
          categories: Array.from({ length: factsNumber }, lorem.word),
          created_at: date.past(),
          icon_url: image.imageUrl(60, 60, 'abstract'),
          id: random.uuid(),
          updated_at: date.recent(),
          value: lorem.paragraph(),
          url: internet.url()
        }))
      } as IList<IFact>
    };

    store = new Vuex.Store({ modules: { DataModule } });

    wrapper = shallowMount(FactList, {
      store,
      localVue,
      mocks: {
        $route: {
          params: { term: termParam }
        },
        $router: {
          push: jest.fn()
        }
      }
    });
    component = wrapper.vm;
  };

  it('should create', () => {
    const term = lorem.word();
    mountComponent(true, term);

    expect(component.facts).toBeTruthy();
    expect(component.term).toBe(term);
    expect(component).toBeTruthy();
  });

  it('should redirect to home page if term is not passed by param', () => {
    spyOn(component.$router, 'push');

    mountComponent(true, undefined);

    expect(component.$router.push).toHaveBeenCalledWith({ name: 'home' });
  });

  it('should request a random fact by query using term', () => {
    const term = lorem.word();
    mountComponent(true, term);

    expect(actions.requestFactByQuery).toHaveBeenCalled();
  });

  it('should redirect to home page if the request is rejected', async () => {
    spyOn(component.$router, 'push');

    const term = lorem.word();
    mountComponent(false, term);

    expect(actions.requestFactByQuery).toHaveBeenCalled();

    await component.$nextTick();

    expect(component.$router.push).toHaveBeenCalledWith({ name: 'home' });
  });
});
