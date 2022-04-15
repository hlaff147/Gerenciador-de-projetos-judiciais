/// <reference types="cypress" />

describe("Testes de detalhe de processo", () => {
  beforeEach(() => {
    cy.visit("processos");
    cy.get("[data-cy='proccess-list'] > li:last a").click();
  });

  it("Selecionar um processo na lista de processos leva à sua página de detlalhes", () => {
    cy.visit("processos");
    cy.get("[data-cy='proccess-list']").should("have.length.at.least", 1);
    cy.get("[data-cy='proccess-list'] > li:last a").click();
    cy.url().should("match", /processos\/\d+/);
  });
});

describe("Testes de acesso a documentos", () => {
  it("Clicar em um documento na lista de documentos exibe modal", () => {
    // Acessa processo mais antigo na lista
    cy.visit("processos");
    cy.get("[data-cy='proccess-list'] > li:last a").click();

    cy.get("app-document-detail").should("not.exist");
    cy.get("[data-cy='document-list']").should("have.length.at.least", 1);
    cy.get("[data-cy='document-list'] [data-cy='document-icon']:last").click();
    cy.get("app-document-detail").should("be.visible");
  });

  it("Botão `Fechar` fecha o modal", () => {
    // Modal exibido em teste anterior
    cy.get("app-document-detail").should("exist");

    cy.get("[data-btn='close']").click();
    cy.get("app-document-detail").should("not.exist");
  });
});

describe("Testes de gerência de documentos", () => {
  it("Botão de adicionar documento abre menu de criação", () => {
    cy.get("app-new-document").should("not.exist");
    cy.get("[data-btn='add-document']").click();
    cy.get("app-new-document").should("exist");
  });

  it("Submeter documento inválido não o adiciona à lista", () => {
    const listLength = 2;
    cy.get("[data-cy='document-list']")
      .children()
      .should("have.length", listLength);
    cy.get("[data-btn='document-save']").click();
    cy.get("[data-cy='document-list']")
      .children()
      .should("have.length", listLength);
  });

  it("Botão de `Cancelar` deve fechar menu de criação", () => {
    cy.get("app-new-document").should("exist");
    cy.get("[data-btn='document-cancel']").click();
    cy.get("app-new-document").should("not.exist");
  });

  it("Submeter documento com campos vazios exibe mensagens de erro", () => {
    // Exibir o modal
    cy.get("[data-btn='add-document']").click();
    cy.get("app-new-document").should("exist");

    // Não aparecem mensagens de erro
    cy.get("[data-error='name-missing']").should("not.exist");

    cy.get("[data-btn='document-save']").click();

    cy.get("[data-error='name-missing']").should("exist");
    cy.get("app-new-document").should("exist");
  });
});
