import Loading from '@/components/Loading.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';

describe('Loading.vue', () => {
  let wrapper: Wrapper<Loading>;
  let component: any;

  const mountComponent = () => {
    wrapper = shallowMount(Loading);
    component = wrapper.vm;
  };

  beforeEach(() => mountComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
