/// <reference types="cypress" />

import { internet, lorem, date, image, random } from 'faker';

describe('FactList', () => {
  const generateFacts = (count = 1) => ({
    total: count,
    result: Array.from({ length: count }, () => ({
      categories: [lorem.word()],
      created_at: date.past(),
      icon_url: image.imageUrl(60, 60, 'abstract'),
      id: random.uuid(),
      updated_at: date.recent(),
      value: lorem.paragraph(),
      url: internet.url()
    }))
  });

  const checkRender = (facts) => {
    if (!facts?.total) return;

    facts.result.forEach((fact, i) => {
      cy.get('.card-basic__source')
        .eq(i)
        .should('have.attr', 'href', fact.url)
        .should('have.text', `#${fact.id}`);

      cy.get('.card-basic__icon img')
        .eq(i)
        .should('have.attr', 'src', fact.icon_url);

      cy.get('.card-basic__message')
        .eq(i)
        .should('have.attr', 'cite', fact.url)
        .should('have.text', fact.value);

      cy.get('.card-basic__footer')
        .eq(i)
        .children('small')
        .first()
        .should('have.text', `created at: ${fact.created_at.toLocaleString()}`);

      cy.get('.card-basic__footer')
        .eq(i)
        .children('small')
        .last()
        .should('have.text', `updated at: ${fact.updated_at.toLocaleString()}`);

      cy.get('.card-basic__badges')
        .eq(i)
        .children('.card-basic__badge')
        .should('have.length', fact.categories.length);

      cy.get('.card-basic__badges')
        .eq(i)
        .children('.card-basic__badge')
        .first()
        .should('have.text', fact.categories[0]);
    });
  };

  it('should show one specific fact', () => {
    const mockedFacts = generateFacts(1);
    const term = mockedFacts.result[0].value.slice(0, 10).trim();

    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(term)}` }, mockedFacts);

    cy.visit(`/fact-list/${term}`);

    cy.get('.fact-list__headings h1').should('have.text', '1 Fact Found');
    cy.get('.fact-list__headings h2').should('have.text', `related to "${term}"`);
    cy.get('.fact-list__empty').should('not.exist');

    checkRender(mockedFacts);
  });

  it('should show many facts', () => {
    const count = random.number({ min: 2, max: 5 });
    const mockedFacts = generateFacts(count);
    const term = mockedFacts.result[0].value.slice(0, 10).trim();

    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(term)}` }, mockedFacts);

    cy.visit(`/fact-list/${term}`);

    cy.get('.fact-list__headings h1').should('have.text', `${count} Facts Found`);
    cy.get('.fact-list__headings h2').should('have.text', `related to "${term}"`);
    cy.get('.fact-list__empty').should('not.exist');

    checkRender(mockedFacts);
  });

  it('should not show facts and show Chuck Norris disappointment', () => {
    const term = lorem.word();
    const mockedFacts = generateFacts(0);

    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(term)}` }, mockedFacts);
    cy.visit(`/fact-list/${term}`);

    cy.get('.fact-list__headings h1').should('have.text', 'No Facts Found');
    cy.get('.fact-list__headings h2').should('have.text', `related to "${term}"`);
    cy.get('.fact-list__empty')
      .should('exist')
      .should('be.visible');
  });

  it('should show Chuck Norris waiting while facts is loading', () => {
    const term = lorem.word();
    const mockedFacts = generateFacts(0);

    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(term)}` }, mockedFacts);
    cy.visit(`/fact-list/${term}`);

    cy.get('.fact-list__headings h1').should('have.text', 'No Facts Found');
    cy.get('.fact-list__headings h2').should('have.text', `related to "${term}"`);
    cy.get('.fact-list__empty')
      .should('exist')
      .should('be.visible');
  });
});
