/// <reference types="cypress" />

describe("Testes de cadastro", () => {
  beforeEach(() => {
    cy.visit("cadastro");
  });

  it("Submissão de campos vazios gera mensagens de erro", () => {
    cy.get("[data-btn='signup']").first().click();
    cy.get("[data-error='name-missing']").should("exist").and("be.visible");
    cy.get("[data-error='cpf-missing']").should("exist").and("be.visible");
    cy.get("[data-error='email-missing']").should("exist").and("be.visible");
    cy.get("[data-error='phone-missing']").should("exist").and("be.visible");
    cy.get("[data-error='function-missing']").should("exist").and("be.visible");
    cy.get("[data-error='password-missing']").should("exist").and("be.visible");
    cy.get("[data-error='conf-password-missing']")
      .should("exist")
      .and("be.visible");
  });

  it("CPF não pode ter letras", () => {
    cy.get("input[name=cpf]").type("1111111111a");
    cy.get("input[name=cpf]").should("have.value", "111.111.111-1");
  });

  it("CPF deve ter 11 dígitos", () => {
    cy.get("input[name=cpf]").type("1111111111");
    cy.get("[data-btn='signup']").first().click();
    cy.get("[data-error='cpf-length']").should("exist").and("be.visible");
  });

  it("Nome não deve ter números", () => {
    cy.get("input[name=name]").type("Humbert0");
    cy.get("[data-error='name-numbers']").should("exist").and("be.visible");
  });

  it("Telefone não deve ter letras", () => {
    cy.get("input[name=phone]").type("819112b3344");
    cy.get("input[name=phone]").should("have.value", "(81) 91123-344");
  });

  it("Senha deve ter, no mínimo, 5 dígitos", () => {
    cy.get("input[name=password]").type("aaaa");
    cy.get("[data-error='password-length']").should("exist").and("be.visible");
  });

  it("Senha deve ter letras minúsculas", () => {
    cy.get("input[name=password]").type("senha1234");
    cy.get("[data-error='password-novalidchar']")
      .should("exist")
      .and("be.visible");
  });

  it("Senha deve ter letras maiúsculas", () => {
    cy.get("input[name=password]").type("senha1234");
    cy.get("[data-error='password-novalidchar']")
      .should("exist")
      .and("be.visible");
  });

  it("Senha deve ter números", () => {
    cy.get("input[name=password]").type("Senha");
    cy.get("[data-error='password-novalidchar']")
      .should("exist")
      .and("be.visible");
  });

  it("Senha de confirmação deve ser igual à senha", () => {
    cy.get("input[name=password]").type("senha1234");
    cy.get("input[name=conf-password]").type("senha123");
    cy.get("[data-error='conf-password-unmatched']")
      .should("exist")
      .and("be.visible");
    cy.get("input[name=conf-password]").type("4");
    cy.get("[data-error='conf-password-unmatched']").should("not.exist");
  });

  it("Cadastro com dados válidos não gera mensagems de erro", () => {
    cy.get("input[name=cpf]").type("11111111111");
    cy.get("input[name=password]").type("senha1234");
    cy.get("input[name=name]").type("joao");
    cy.get("input[name=email]").type("jaozinhoreidelas12@gmail.com");
    cy.get("input[name=phone]").type("81911223344");
    cy.get("input[name=conf-password]").type("Senha1234");
    cy.get("[name=function]").click();
    cy.contains("Advogado").click();

    cy.get("[data-btn='signup']").first().click();

    cy.get("[data-error='cpf-missing']").should("not.exist");
    cy.get("[data-error='password-missing']").should("not.exist");
    cy.get("[data-error='name-missing']").should("not.exist");
    cy.get("[data-error='email-missing']").should("not.exist");
    cy.get("[data-error='phone-missing']").should("not.exist");
    cy.get("[data-error='function-missing']").should("not.exist");
    cy.get("[data-error='conf-password-missing']").should("not.exist");
  });
});
