/// <reference types="cypress" />

describe("Testes de login", () => {
  it("Clicar em item `Login` na barra de navegação abre página de login", () => {
    cy.visit("");
    cy.get('[data-cy="login-link"]').click();
    cy.url().should("include", "login");
    cy.get("[data-cy=login-form]").should("be.visible");
  });

  it("Login não pode ser efetuado com campos vazios", () => {
    cy.get('[data-cy="login-btn"]').click();
    cy.get('[data-cy="login-cpf-missing"]').should("be.visible");
    cy.get('[data-cy="login-password-missing"]').should("be.visible");
  });
});
