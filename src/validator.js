/**
 * Validates all parameters for a person
 * @param {Object} person - { birthDate, zip, identity, email }
 * @returns {true} if everything is valid
 * @throws {Error} if a field is invalid
 */
export function validatePerson(person) {
    if (!person || typeof person !== "object") {
        throw new Error("INVALID_PERSON");
    }

    validateAge(person.birthDate);
    validateZipCode(person.zip);
    validateIdentity(person.identity);
    validateEmail(person.email);

    return true;
}