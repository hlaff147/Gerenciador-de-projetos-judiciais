/// <reference types="cypress" />

describe("Testes de signup", () => {
  beforeEach(() => {
    cy.visit("cadastro");
  });

  it("Clicar em item `cadastro` na barra de navegação abre página de cadastro", () => {
    cy.visit("");
    cy.get("[data-cy='signup-link']").click();
    cy.url().should("include", "cadastro");
    cy.get("app-signup-form").should("be.visible");
  });
});
