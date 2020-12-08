import CardBasic from '@/components/CardBasic.vue';
import IFact from '@/interfaces/fact.interface';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { date, image, internet, lorem, random } from 'faker';

describe('CardBasic.vue', () => {
  let wrapper: Wrapper<CardBasic>;
  let component: any;
  let fact: IFact;

  const mountComponent = () => {
    fact = {
      categories: [...new Set(Array.from({ length: 3 }, lorem.word))],
      created_at: date.past(),
      icon_url: image.imageUrl(60, 60, 'abstract'),
      id: random.uuid(),
      updated_at: date.recent(),
      value: lorem.paragraph(),
      url: internet.url()
    };

    wrapper = shallowMount(CardBasic, { propsData: { fact } });
    component = wrapper.vm;
  };

  beforeEach(() => mountComponent());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render fact content', () => {
    const created_at = component.formatDate(fact.created_at);
    const updated_at = component.formatDate(fact.updated_at);

    fact.categories.forEach((category) => expect(wrapper.text()).toMatch(category));

    expect(wrapper.text()).toMatch(created_at);
    expect(wrapper.text()).toMatch(fact.id);
    expect(wrapper.text()).toMatch(fact.value);
    expect(wrapper.text()).toMatch(updated_at);
  });
});
