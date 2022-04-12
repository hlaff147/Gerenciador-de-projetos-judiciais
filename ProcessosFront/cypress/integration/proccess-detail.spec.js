/// <reference types="cypress" />

describe("Testes de detalhe de processo", () => {
  beforeEach(() => {
    cy.visit("perfil");
    cy.get("[data-cy='proccess-list'] > li:last a").click();
  });

  it("Selecionar um processo na lista de processos leva à sua página de detlalhes", () => {
    cy.visit("perfil");
    cy.get("[data-cy='proccess-list']").should("have.length.at.least", 1);
    cy.get("[data-cy='proccess-list'] > li:last a").click();
    cy.url().should("match", /processos\/\d+/);
  });
});
