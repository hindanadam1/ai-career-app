describe("test entretien", () => {
  it("genere entretien ", () => {
    cy.visit("http://localhost:5173/entretien");

    cy.get("input").eq(0).type("dev");
    cy.get("select").select(0);

    cy.contains("Générer").click();

    cy.url().should("include", "/entretien");
  });
});
// non realisé 
