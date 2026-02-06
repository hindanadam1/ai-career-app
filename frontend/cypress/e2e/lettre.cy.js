describe('generation de letter', () => {
    it('la formulaire pour cree le cv saffiche', () => {
        cy.visit('http://localhost:5173/lettre')

        cy.get("input[type='text']").eq(0).type("dev");
        cy.get("input[type='text']").eq(1).type("engie");
        cy.get("textarea").eq(0).type("etudiante");
       
        cy.contains("Générer").click();
        
      cy.url().should("include", "/lettre");


    });
})
// no realisé