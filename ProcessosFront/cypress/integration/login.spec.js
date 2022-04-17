/// <reference types="cypress" />

describe("Testes de login", () => {
  beforeEach(() => {
    cy.visit("login");
  });

  it("Submissão de campos vazios gera mensagens de erro", () => {
    cy.get("[data-btn='login']").click();
    cy.get("[data-error='cpf-missing']").should("be.visible").and("be.visible");
    cy.get("[data-error='password-missing']")
      .should("be.visible")
      .and("be.visible");
  });

  it("CPF não pode conter letras", () => {
    cy.get("input[name=cpf]").type("1111111111a");
    cy.get("input[name=cpf]").should("have.value", "111.111.111-1");
  });

  it("CPF deve ter 11 dígitos", () => {
    cy.get("input[name=cpf]").type("1111111111");
    cy.get("[data-btn='login']").click();
    cy.get("[data-error='cpf-length']").should("be.visible");
  });

  it("Login com dados válidos não gera mensagens de erro", () => {
    cy.get("input[name=cpf]").type("11111111111");
    cy.get("input[name=password]").type("Senha1234");
    cy.get("[data-btn='login']").click();
    cy.get("[data-error='cpf-missing']").should("not.exist");
    cy.get("[data-error='password-missing']").should("not.exist");
  });
});
