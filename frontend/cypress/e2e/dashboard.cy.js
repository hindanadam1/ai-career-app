describe("Dashboard", () => {
  it("Le dashboard s'affiche", () => {
    cy.visit("http://localhost:5173/dashboard");

    cy.contains("Tableau de bord").should("exist");
    cy.contains("Générer un CV").should("exist");
    cy.contains("Lettre de motivation").should("exist");
    cy.contains("Préparer un entretien").should("exist");
  });
});
// bon fonctionnement 