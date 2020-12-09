/// <reference types="cypress" />

import { internet, lorem, date, image, random } from 'faker';

describe('Home', () => {
  let searchTerm;
  let mockedCategories;
  let mockedFacts;

  beforeEach(() => {
    searchTerm = lorem.words(2);
    mockedCategories = Array.from({ length: random.number({ min: 10, max: 20 }) }, lorem.word);
    mockedFacts = {
      total: 3,
      result: Array.from({ length: 3 }, () => ({
        categories: [mockedCategories[0]],
        created_at: date.past(),
        icon_url: image.imageUrl(60, 60, 'abstract'),
        id: random.uuid(),
        updated_at: date.recent(),
        value: lorem.paragraph(),
        url: internet.url()
      }))
    };

    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/random` }, mockedFacts.result[0]);
    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/categories` }, mockedCategories);
    cy.intercept({ method: 'GET', url: `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchTerm)}` }, mockedFacts);
    cy.intercept(
      {
        method: 'GET',
        url: `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(mockedCategories[0])}`
      },
      mockedFacts.result[0]
    );

    cy.visit('/');
  });

  describe('Search', () => {
    it('should errors be visible with short search term', () => {
      cy.get('.search__control').should('have.attr', 'minlength', '3');
      cy.get('.search__error').should('not.exist');

      cy.get('.search__control').type(searchTerm.slice(0, 2));
      cy.get('.search__error')
        .should('be.visible')
        .should('have.text', 'length must be between 3 and 120 characters');
    });

    it('should errors be visible with long search term', () => {
      const typeTerm = lorem.paragraph();
      const maxlengthTerm = typeTerm.slice(0, 120);

      cy.get('.search__control').should('have.attr', 'maxlength', '120');
      cy.get('.search__error').should('not.exist');

      cy.get('.search__control')
        .type(typeTerm)
        .should('have.value', maxlengthTerm);

      cy.get('.search__error').should('not.exist');
    });

    it('should redirect to fact list page after enter key is pressed', () => {
      cy.get('.search__control')
        .type(searchTerm)
        .type('{enter}');

      cy.location('pathname').should('eq', `/fact-list/${encodeURIComponent(searchTerm)}`);
    });

    it('should redirect to fact list page after search button is clicked', () => {
      cy.get('.search__control').type(searchTerm);
      cy.get('.search__action').click();

      cy.location('pathname').should('eq', `/fact-list/${encodeURIComponent(searchTerm)}`);
    });
  });

  describe('Feeling Lucky', () => {
    it('should redirect to fact details page when the button is focused', () => {
      cy.get('.feeling-lucky__action').click();

      cy.location('pathname').should('eq', '/fact-details');
    });
  });

  describe('Categories', () => {
    it('should redirect to fact details page when the category button is clicked', () => {
      cy.get('.categories__item')
        .first()
        .click();

      cy.location('pathname').should('eq', '/fact-details');
      cy.location('search').should('eq', `?category=${encodeURIComponent(mockedCategories[0])}`);
    });
  });
});
