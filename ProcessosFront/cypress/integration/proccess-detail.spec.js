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

describe("Testes de acesso a documentos", () => {
  it("Clicar em um documento na lista de documentos exibe modal", () => {
    // Acessa processo mais antigo na lista
    cy.visit("perfil");
    cy.get("[data-cy='proccess-list'] > li:last a").click();

    cy.get(".modal").should("not.exist");
    cy.get("[data-cy='document-list']").should("have.length.at.least", 1);
    cy.get("[data-cy='document-list'] li:last div").click();
    cy.get(".modal").should("exist").and("be.visible");
  });

  it("Botão de fechar documento fecha o modal", () => {
    // Modal exibido em teste anterior
    cy.get(".modal").should("exist").and("be.visible");

    cy.get("[data-btn='close-doc-1']").click();
    cy.get(".modal").should("not.exist");
  });

  it("Botão `Fechar` fecha o modal", () => {
    // Exibe o modal
    cy.get("[data-cy='document-list'] li:last div").click();
    cy.get(".modal").should("exist").and("be.visible");

    cy.get("[data-btn='close-doc-2']").click();
    cy.get(".modal").should("not.exist");
  });
});

describe("Testes de gerência de documentos", () => {
  it("Botão de adicionar documento abre menu de criação", () => {
    cy.get(".modal").should("not.exist");
    cy.get("[data-btn='add-document']").click();
    cy.get(".modal").should("exist").and("be.visible");
  });

  it("Submeter documento inválido não o adiciona à lista", () => {
    cy.get("[data-cy='document-list']").children().should("have.length", 3);
    cy.get("[data-btn='document-save']").click();
    cy.get("[data-cy='document-list']").children().should("have.length", 3);
  });

  it("Botão de `Cancelar` deve fechar menu de criação", () => {
    cy.get(".modal").should("exist").and("be.visible");
    cy.get("[data-btn='document-cancel']").click();
    cy.get(".modal").should("not.exist");
  });

  it("Submeter documento com campos vazios exibe mensagens de erro", () => {
    // Exibir o modal
    cy.get("[data-btn='add-document']").click();
    cy.get(".modal").should("exist").and("be.visible");

    // Não aparecem mensagens de erro
    cy.get("[data-error='document-format']").should("not.be.visible");
    cy.get("[data-error='document-name']").should("not.be.visible");
    cy.get("[data-error='document-date']").should("not.be.visible");

    cy.get("[data-btn='document-save']").click();

    cy.get("[data-error='document-format']").should("be.visible");
    cy.get("[data-error='document-name']").should("be.visible");
    cy.get("[data-error='document-date']").should("be.visible");
  });
});
