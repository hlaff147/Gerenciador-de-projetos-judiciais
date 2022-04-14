/// <reference types="cypress" />

describe("Testes de login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Clicar em item `Login` na barra de navegação abre página de login", () => {
    cy.visit("");
    cy.get("[data-cy='login-link']").click();
    cy.url().should("include", "login");
    cy.get("app-login-form").should("be.visible");
  });

  it("Login não pode ser efetuado com campos vazios", () => {
    cy.get("[data-cy='login-btn']").click();
    cy.get("[data-error='cpf-missing']").should("be.visible");
    cy.get("[data-error='password-missing']").should("be.visible");
  });

  it("CPF não pode conter letras", () => {
    cy.get("input[name=cpf]").type("1111111111a");
    cy.get("[data-error='cpf-letters']").should("be.visible");
  });

  it("CPF deve ter 11 dígitos", () => {
    cy.get("input[name=cpf]").type("1111111111");
    cy.get("[data-cy='login-btn']").click();
    cy.get("[data-error='cpf-length']").should("be.visible");
  });
});
