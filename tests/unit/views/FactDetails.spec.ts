import IFact from '@/interfaces/fact.interface';
import IList from '@/interfaces/list.interface';
import DataModule from '@/store/modules/data.module';
import FactDetails from '@/views/FactDetails.vue';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import { date, image, internet, lorem, random } from 'faker';
import Vuex, { Store } from 'vuex';

describe('FactDetails.vue', () => {
  let actions: any;
  let store: Store<any>;
  let wrapper: Wrapper<FactDetails>;
  let component: any;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mountComponent = (containsFacts: boolean, categoryParam?: string) => {
    actions = {
      requestRandomFact: jest.spyOn(DataModule.actions as any, 'requestRandomFact').mockResolvedValue(null),
      requestRandomFactByCategory: jest.spyOn(DataModule.actions as any, 'requestRandomFactByCategory').mockResolvedValue(null)
    };

    store = new Vuex.Store({ modules: { DataModule } });

    store.replaceState({
      facts: !containsFacts
        ? null
        : ({
            total: 1,
            result: [
              {
                categories: [categoryParam],
                created_at: date.past(),
                icon_url: image.imageUrl(60, 60, 'abstract'),
                id: random.uuid(),
                updated_at: date.recent(),
                value: lorem.paragraph(),
                url: internet.url()
              }
            ]
          } as IList<IFact>)
    });

    wrapper = shallowMount(FactDetails, {
      store,
      localVue,
      mocks: {
        $route: {
          query: { category: categoryParam }
        },
        $router: {
          push: jest.fn()
        }
      }
    });
    component = wrapper.vm;
  };

  it('should create', () => {
    mountComponent(true);
    expect(component.fact).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should request a random fact by category when category is passed by query param', () => {
    const category = lorem.word();

    mountComponent(true, category);
    expect(component.isOnFire).toBeFalsy();
    expect(actions.requestRandomFactByCategory).toHaveBeenCalled();
  });

  it('should request a random fact when category is not passed by query param', () => {
    mountComponent(true);
    expect(component.isOnFire).toBeTruthy();
    expect(actions.requestRandomFact).toHaveBeenCalled();
  });

  it('should return empty fact if fact list is empty', () => {
    mountComponent(false);
    expect(component.fact).toStrictEqual({});
  });
});
