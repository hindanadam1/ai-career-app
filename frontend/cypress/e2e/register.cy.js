describe("Inscription", () => {
  it("Un utilisateur peut s'inscrire", () => {
    cy.visit("http://localhost:5173/register");

    cy.get("input[type='text']").type("hind");
    cy.get("input[type='email']").type("hind@gmail.com");
    cy.get("input[type='password']").type("hind");

    cy.contains("S'inscrire").click();

    cy.url().should("include", "/");
  });
});
// validé