describe('generation de cv', () => {
    it('la formulaire pour cree le cv saffiche', () => {
        cy.visit('http://localhost:5173/cv')

        cy.get("input[type='text']").eq(0).type("nesrine");
        cy.get("input[type='text']").eq(1).type("eulalia");
        cy.get("input[type='text']").eq(2).type("eulalia");
        cy.get("textarea").eq(0).type("organisé");
        cy.get("textarea").eq(1).type("stage ");

        cy.contains("Générer").click();

    
       cy.url().should("include", "/cv");
       
      });
})
// bon fonctionnement 