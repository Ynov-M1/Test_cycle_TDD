describe("Navigation and User Registration E2E Tests", () => {

    const newUser = {
        firstName: "Théo",
        lastName: "Lafond",
        email: "theo@example.com",
        birthDate: "2001-09-02",
        zip: "03100",
        city: "Montluçon"
    };

    beforeEach(() => {
        // Reset localStorage before each test to start clean
        cy.clearLocalStorage();
        cy.visit("/");
    });

    it("Nominal Scenario: Add a valid user", () => {
        cy.get('[data-cy=user-count]').should("contain", "0");
        cy.get('[data-cy=user-list]').should("not.exist");

        cy.get('[data-cy=nav-register]').click();
        cy.url().should("include", "/register");

        cy.get('[data-cy=firstName]').type(newUser.firstName);
        cy.get('[data-cy=lastName]').type(newUser.lastName);
        cy.get('[data-cy=email]').type(newUser.email);
        cy.get('[data-cy=birthDate]').type(newUser.birthDate);
        cy.get('[data-cy=zip]').type(newUser.zip);
        cy.get('[data-cy=city]').type(newUser.city);

        cy.get('[data-cy=submit]').click();

        cy.get('#success-toast').should('be.visible');

        cy.get('[data-cy=back-home]').click();
        cy.url().should("eq", Cypress.config().baseUrl);

        cy.get('[data-cy=user-count]').should("contain", "1");
        cy.get('[data-cy=user-list]').should("contain", `${newUser.firstName} ${newUser.lastName}`);
    });

    it("Error Scenario: Invalid Add Attempt", () => {
        cy.window().then(win => {
            win.localStorage.setItem("persons", JSON.stringify([newUser]));
        });

        cy.visit("/");
        cy.get('[data-cy=user-count]').should("contain", "1");

        cy.get('[data-cy=nav-register]').click();
        cy.location("pathname").should("include", "/register");

        /* Fields empty */
        cy.get('[data-cy=submit]').should("be.disabled");

        /* INVALID DATE */
        cy.get('[data-cy=firstName]').type("Jean");
        cy.get('[data-cy=lastName]').type("Dupont");
        cy.get('[data-cy=email]').type("jean@test.com");
        cy.get('[data-cy=zip]').type("75000");
        cy.get('[data-cy=city]').type("Paris");

        cy.get('[data-cy=birthDate]').type("1890-01-01").blur();
        cy.contains("La date de naissance est trop ancienne").should("be.visible");
        cy.get('[data-cy=submit]').should("be.disabled");

        /* Email already exist */
        cy.get('[data-cy=birthDate]').clear().type("1995-05-10");
        cy.get('[data-cy=email]').clear().type(newUser.email);
        cy.get('[data-cy=submit]').click();
        cy.get('.error').should("exist");
        cy.contains("Cet email est déjà utilisé").should("be.visible");

        cy.get('.error').should("have.length", 1);

        cy.get('[data-cy=back-home]').click();

        cy.get('[data-cy=user-count]').should("contain", "1");
        cy.get('[data-cy=user-list]').should("contain", `${newUser.firstName} ${newUser.lastName}`);
    });

});