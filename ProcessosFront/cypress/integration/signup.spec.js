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

  it("Telefone não deve ter letras", () => {
    cy.get("input[name=phone]").type("9111b1111");
    cy.get("[data-error='phone-letters']").should("be.visible");
  });

  it("Senha de confirmação deve ser igual à senha", () => {
    cy.get("input[name=password]").type("senha1234");
    cy.get("input[name=repeatPassword]").type("senha123");
    cy.get("[data-error='password-divergent']").should("be.visible");
    cy.get("input[name=repeatPassword]").type("4");
    cy.get("[data-error='password-divergent']").should("not.be.visible");
  });
});
