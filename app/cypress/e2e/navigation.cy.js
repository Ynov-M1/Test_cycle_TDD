describe("Navigation and User Registration E2E Tests", () => {

    const newUser = {
        firstName: "Cristophe",
        lastName: "Trival",
        email: "Cri.trival@example.com",
        birthDate: "1989-01-22",
        zip: "03100",
        city: "Montluçon"
    };

    beforeEach(() => {
        cy.visit("/");
    });

    context("Nominal Scenario: Add a valid user", () => {
        it("should allow a user to register successfully", () => {
            cy.get('[data-cy=user-count]').should("contain", "2");
            cy.get('[data-cy=user-list]').should("exist");

            // Navigate to register
            cy.get('[data-cy=nav-register]').click();
            cy.url().should("include", "/register");

            // Fill form
            cy.get('[data-cy=firstName]').type(newUser.firstName);
            cy.get('[data-cy=lastName]').type(newUser.lastName);
            cy.get('[data-cy=email]').type(newUser.email);
            cy.get('[data-cy=birthDate]').type(newUser.birthDate);
            cy.get('[data-cy=zip]').type(newUser.zip);
            cy.get('[data-cy=city]').type(newUser.city);

            cy.get('[data-cy=submit]').click();

            cy.get('#success-toast').should('be.visible')
                .and('contain.text', "Enregistré avec succès");

            // Back home
            cy.get('[data-cy=back-home]').click();
            cy.url().should("eq", Cypress.config().baseUrl);

            cy.get('[data-cy=user-count]').should("contain", "3");
            cy.get('[data-cy=user-list]').should("contain", `${newUser.firstName} ${newUser.lastName}`);
        });
    });

    context("Error Scenario: Email already exists (400)", () => {
        it("should display EMAIL_ALREADY_EXISTS error", () => {

            cy.get('[data-cy=user-count]').should("contain", "3");

            cy.get('[data-cy=user-list]')
                .children()
                .eq(2)
                .then(($li) => {
                    const text = $li.text().trim();
                    const [fullName, emailPart] = text.split('(');
                    const [firstName, lastName] = fullName.trim().split(' ');
                    const email = emailPart.replace(')', '').trim();

                    const existingUser = {
                        firstName,
                        lastName,
                        email
                    };

                    cy.get('[data-cy=nav-register]').click();
                    cy.url().should("include", "/register");

                    // Fill form with existing email
                    cy.get('[data-cy=firstName]').type(existingUser.firstName);
                    cy.get('[data-cy=lastName]').type(existingUser.lastName);
                    cy.get('[data-cy=email]').type(existingUser.email);
                    cy.get('[data-cy=birthDate]').type("2001-01-01");
                    cy.get('[data-cy=zip]').type("03100");
                    cy.get('[data-cy=city]').type("Montluçon");

                    cy.get('[data-cy=submit]').click();

                    // Should display error
                    cy.contains("Cet email est déjà utilisé").should("be.visible");

                    // Back home
                    cy.get('[data-cy=back-home]').click();
                    cy.get('[data-cy=user-count]').should("contain", "3");
                });
        });
    });

    describe("User Deletion via UI (API)", () => {
        it("should delete the second user using the trash button", () => {
            cy.get('[data-cy=user-list]').children().should('have.length.greaterThan', 1);

            cy.get('[data-cy=user-list]')
                .children()
                .eq(2)
                .as('secondUserRow');

            cy.get('@secondUserRow').find('button.delete-btn').click();

            cy.on('window:confirm', (text) => {
                expect(text).to.contain('Voulez-vous vraiment supprimer');
                return true;
            });

            cy.get('#success-delete-user-toast').should('be.visible')
                .and('contain.text', "Utilisateur supprimé avec succès !");

            cy.get('[data-cy=user-list]').children().should('have.length.lessThan', 3);
        });
    });

    context("Error Scenario: Server crash (500)", { tags: '@server-error'}, () => {
        it("should display alert and not crash app", () => {

            cy.get('[data-cy=nav-register]').click();

            cy.get('[data-cy=firstName]').type("Alice");
            cy.get('[data-cy=lastName]').type("Durand");
            cy.get('[data-cy=email]').type("alice@example.com");
            cy.get('[data-cy=birthDate]').type("1998-01-01");
            cy.get('[data-cy=zip]').type("75001");
            cy.get('[data-cy=city]').type("Paris");

            cy.get('[data-cy=submit]').click();

            cy.get('.toast-server-error')
                .should('be.visible')
                .and('contain.text', "Serveur indisponible, réessayez plus tard");
        });
    });

});