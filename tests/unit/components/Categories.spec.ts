import Categories from '@/components/Categories.vue';
import DataModule from '@/store/modules/data.module';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import { lorem } from 'faker';
import Vuex from 'vuex';

describe('Categories.vue', () => {
  let actions: any;
  let store: any;
  let wrapper: Wrapper<Categories>;
  let component: any;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mountComponent = () => {
    actions = {
      requestCategories: spyOn(DataModule.actions as any, 'requestCategories')
    };

    store = new Vuex.Store({ modules: { DataModule } });

    wrapper = shallowMount(Categories, {
      store,
      localVue,
      mocks: {
        $router: { push: jest.fn() }
      }
    });
    component = wrapper.vm;
  };

  beforeEach(() => mountComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request categories when component are created', () => {
    expect(actions.requestCategories).toHaveBeenCalled();
  });

  it('should redirect to fact details page', () => {
    const category = lorem.word();

    component.redirectToFact(category);

    expect(component.$router.push).toHaveBeenCalledWith({ name: 'fact-details', query: { category } });
  });
});
