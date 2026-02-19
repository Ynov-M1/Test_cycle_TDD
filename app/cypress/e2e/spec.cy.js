describe("PersonForm", () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it("should display the title", () => {
        cy.contains("Formulaire d'inscription").should("be.visible")
    })

    it("should have submit button disabled initially", () => {
        cy.contains("Soumettre").should("be.disabled")
    })

})