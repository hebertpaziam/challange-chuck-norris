import FeelingLucky from '@/components/FeelingLucky.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('FeelingLucky.vue', () => {
  let wrapper: Wrapper<FeelingLucky>;
  let component: any;

  const mountComponent = () => {
    wrapper = shallowMount(FeelingLucky, {
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

  it('should redirect to fact details page', () => {
    component.redirectToFact();
    expect(component.$router.push).toHaveBeenCalledWith({ name: 'fact-details' });
  });
});
