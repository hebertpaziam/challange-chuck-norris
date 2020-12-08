import DataModule from '@/store/modules/data.module';
import Home from '@/views/Home.vue';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex from 'vuex';

describe('Home.vue', () => {
  let actions: any;
  let store: any;
  let wrapper: Wrapper<Home>;
  let component: any;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const mountComponent = () => {
    actions = {
      clearFacts: spyOn(DataModule.actions as any, 'clearFacts')
    };

    store = new Vuex.Store({ modules: { DataModule } });

    wrapper = shallowMount(Home, { store, localVue });
    component = wrapper.vm;
  };

  beforeEach(() => mountComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear facts when home is visited', () => {
    expect(actions.clearFacts).toHaveBeenCalled();
  });
});
