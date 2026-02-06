describe("Connexion", () => {
  it("Un utilisateur peut se connecter", () => {
    cy.visit("http://localhost:5173/");

    cy.get("input[type='email']").type("hind@gmail.com");
    cy.get("input[type='password']").type("hind");

    cy.contains("Se connecter").click();

    cy.url().should("include", "/dashboard");
  });
});
// validé