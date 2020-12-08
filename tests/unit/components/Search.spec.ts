import Search from '@/components/Search.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { lorem } from 'faker';

describe('Search.vue', () => {
  let wrapper: Wrapper<Search>;
  let component: any;

  const mountComponent = () => {
    wrapper = shallowMount(Search, {
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

  it('should return error when term length is lass than 3 characters', () => {
    component.term = lorem.word(2);
    component.checkErrors();
    expect(component.hasError).toBeTruthy();
  });

  it('should return error when term length is more than 120 characters', () => {
    component.term = lorem.words(50);
    component.checkErrors();
    expect(component.hasError).toBeTruthy();
  });

  it('should not return error when term length is between 3 than 120 characters', () => {
    component.term = lorem.words(3);
    component.checkErrors();
    expect(component.hasError).toBeFalsy();
  });

  it('should not redirect to fact list with error', () => {
    spyOn(component, 'checkErrors');
    component.hasError = true;

    component.submitForm();

    expect(component.checkErrors).toHaveBeenCalled();
    expect(component.$router.push).not.toHaveBeenCalled();
  });

  it('should redirect to fact list with no error', () => {
    spyOn(component, 'checkErrors');
    component.hasError = false;
    component.term = lorem.words(3);

    component.submitForm();

    expect(component.checkErrors).toHaveBeenCalled();
    expect(component.$router.push).toHaveBeenCalledWith({ name: 'fact-list', params: { term: component.term } });
  });
});
