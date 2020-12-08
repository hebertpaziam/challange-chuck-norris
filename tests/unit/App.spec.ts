import App from '@/App.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('App.vue', () => {
  let wrapper: Wrapper<App>;
  let component: any;

  const mountComponent = () => {
    wrapper = shallowMount(App, {
      stubs: ['router-view']
    });
    component = wrapper.vm;
  };

  beforeEach(() => mountComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
