/// <reference types="cypress" />

describe("Navegação de usuário não autenticado", () => {
  before(() => {
    cy.visit("");
  });

  it("Links de `Home`, `Cadastro` e `Login` são exibidos", () => {
    cy.get("[data-link='home']").should("exist");
    cy.get("[data-link='signup']").should("exist");
    cy.get("[data-link='login']").should("exist");
  });

  it("Links de `Processos`, `Perfil` e `Logout` são omitidos", () => {
    cy.get("[data-link='profile']").should("not.exist");
    cy.get("[data-link='proccesses']").should("not.exist");
    cy.get("[data-link='logout']").should("not.exist");
  });

  it("Clicar em `Home` leva à página de login", () => {
    cy.get("[data-link='home']").first().click();
    cy.url().should("include", "login");
  });

  it("Clicar no nome do site leva à página de login", () => {
    cy.get("[data-link='title']").click();
    cy.url().should("include", "login");
  });

  it("URLs de links bloqueados levam à página de login", () => {
    cy.visit("");
    cy.url().should("include", "login");

    cy.visit("/perfil");
    cy.url().should("include", "login");

    cy.visit("/processos");
    cy.url().should("include", "login");

    cy.visit("/processos/0");
    cy.url().should("include", "login");
  });
});

describe("Navegação de usuário autenticado", () => {
  before(() => {
    cy.visit("/login");
    cy.get("input[name=cpf]").type("11111111111");
    cy.get("input[name=password]").type("Senha1234");
    cy.get("[data-btn='login']").click();
  });

  it("Links de `Cadastro` e `Login` são omitidos", () => {
    cy.get("[data-link='signup']").should("not.exist");
    cy.get("[data-link='login']").should("not.exist");
  });

  it("Links de `Home`, `Processos`, `Perfil` e `Logout` são exibidos", () => {
    cy.get("[data-link='home']").should("exist");
    cy.get("[data-link='profile']").should("exist");
    cy.get("[data-link='proccesses']").should("exist");
    cy.get("[data-link='logout']").should("exist");
  });

  it("Clicar em `Home` leva à página de processos", () => {
    cy.get("[data-link='home']").first().click();
    cy.get("app-proccess-management").should("exist");
  });

  it("Clicar no nome do site leva à página de processos", () => {
    cy.get("[data-link='title']").click();
    cy.get("app-proccess-management").should("exist");
  });

  /*
   * TODO: Manter o usuário autenticado depois das chamadas de `cy.visit()`
   */
  // Teste temporariamente desativado
  // it("URLs de links bloqueados levam às suas páginas", () => {
  //   cy.visit("");
  //   cy.url().should("include", "processos");

  //   cy.visit("/perfil");
  //   cy.url().should("include", "perfil");

  //   cy.visit("/processos");
  //   cy.url().should("include", "processos");

  //   cy.visit("/processos/0");
  //   cy.url().should("include", "processos");
  // });

  it("Clicar em `Logout` encerra sessão do usuário", () => {
    cy.get("[data-link='logout']").should("exist");
    cy.get("[data-link='logout']").first().click({ multiple: true });
    cy.url().should("include", "login");
  });
});

describe("Navegação de usuário em dispositivos pequenos", () => {
  it("A barra de navegação padrão desaparece em dispositivos pequenos", () => {
    cy.viewport("iphone-x");
    cy.get("[data-cy='navbar-lg']").should("exist").and("not.be.visible");
  });

  it("A barra de navegação depende de um botão em dispositivos pequenos", () => {
    cy.viewport("iphone-x");
    cy.get("[data-cy='navbar-sm']").should("exist").and("not.be.visible");
    cy.get("[data-btn='navbar']").should("exist").and("be.visible");
    cy.get("[data-btn='navbar']").click();
    cy.get("[data-cy='navbar-sm']").should("exist").and("be.visible");
  });
});
