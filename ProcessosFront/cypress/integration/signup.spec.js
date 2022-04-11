/// <reference types="cypress" />

describe("Testes de signup", () => {
  beforeEach(() => {
    cy.visit("cadastro");
  });

  it("Clicar em item `Cadastro` na barra de navegação abre página de cadastro", () => {
    cy.visit("");
    cy.get("[data-cy='signup-link']").click();
    cy.url().should("include", "cadastro");
    cy.get("app-signup-form").should("be.visible");
  });

  it("Nome não deve conter números", () => {
    cy.get("input[name=username]").type("Humbert0");
    cy.get("[data-error='name-numbers']").should("be.visible");
  });
});
