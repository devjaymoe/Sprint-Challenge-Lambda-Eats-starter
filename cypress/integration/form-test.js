describe("Tests our form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/pizza");
    })
    it("Add text to inputs and submit form", () => {
        cy.get('input[name="name"]')
            .type("Devin")
            .should("have.value", "Devin");
        cy.get('input[name="mushrooms"]')
            .check()
            .should("have.checked");
        cy.get('input[name="pineapple"]')
            .check()
            .should("have.checked");
        cy.get('button')
            .click()
    })
})