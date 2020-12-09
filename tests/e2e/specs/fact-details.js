/// <reference types="cypress" />

import { internet, lorem, date, image, random } from 'faker';

describe('FactDetails', () => {
  let fact;

  const checkDefinitions = (index, name, value) => {
    cy.get('.card-detailed__info dt')
      .eq(index)
      .should('have.text', name);
    cy.get('.card-detailed__info dd')
      .eq(index)
      .should('have.text', value);
  };
  const checkRender = (isOnFire) => {
    cy.get('.fact-details__title')
      .should('have.text', 'Random Fact')
      .should(isOnFire ? 'have.class' : 'not.have.class', 'fact-details__title--on-fire');

    cy.get('.card-detailed__content h2').should('have.text', 'Message');
    cy.get('.card-detailed__message').should('have.text', fact.value);

    cy.get('.card-detailed__definition h2').should('have.text', 'Details');
    cy.get('.card-detailed__icon img').should('have.attr', 'src', fact.icon_url);

    cy.get('.card-detailed__info dd a')
      .eq(0)
      .should('have.attr', 'href', fact.url);

    checkDefinitions(0, 'Source', `#${fact.id}`);
    checkDefinitions(1, 'Categories', fact.categories[0]);
    checkDefinitions(2, 'Created at', fact.created_at.toLocaleString());
    checkDefinitions(3, 'Updated at', fact.updated_at.toLocaleString());
  };

  beforeEach(() => {
    fact = {
      categories: [lorem.word()],
      created_at: date.past(),
      icon_url: image.imageUrl(60, 60, 'abstract'),
      id: random.uuid().slice(0, 13),
      updated_at: date.recent(),
      value: lorem.paragraph(),
      url: internet.url()
    };
  });

  it('should render random fact with title on fire', () => {
    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/random` }, fact);
    cy.visit('/fact-details');
    checkRender(true);
  });

  it('should render random fact filtered by category without title on fire', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(fact.categories[0])}`
      },
      fact
    );
    cy.visit(`/fact-details?category=${fact.categories[0]}`);
    checkRender(false);
  });
});
