describe("BookList", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  afterEach(() => {
    cy.contains("Log out").click();
  });

  it("Should add new book", () => {
    cy.addBook("Iron king", "Foreign classics", "Maurice Druon", true);
    cy.get(".card-body").contains("Iron king").should("be.visible");
  });

  it("Should add to favorites", () => {
    cy.addBook("The Headless horseman", "12+", "Mayne Reid");
    cy.contains("The Headless horseman").contains("Add to favorite").click();
    cy.visit("/favorites");
    cy.contains("The Headless horseman")
      .contains("Delete from favorite")
      .should("be.visible");
  });

  it("Should delete book from favorites", () => {
    cy.visit("/favorites");
    cy.contains("The Headless horseman")
      .contains("Delete from favorite")
      .click();
    cy.visit("/");
    cy.contains("The Headless horseman")
      .contains("Add to favorite")
      .should("be.visible");
  });

  it("Book page should have download button", () => {
    cy.addBook("White Fang", "0+", "Jack London");
    cy.contains("White Fang").click();
    cy.wait(1000);
    cy.get(".btn-primary").contains("load").should("be.visible");
  });
});
