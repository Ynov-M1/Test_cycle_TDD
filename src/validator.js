/**
 * Validates all parameters for a person
 * @param {Object} person - { birthDate, zip, identity, email }
 * @param {Date} person.birthDate - Date of birth
 * @param {string} person.zip - French zip code (5 digits)
 * @param {string} person.identity - Name/first name (letters, accents, hyphens)
 * @param {string} person.email - Email address
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

/**
 * Validates a person's age based on birth date.
 * Rejects if under 18 years old.
 * @param {Date} birthDate - Date of birth
 * @returns {boolean} Returns true if age is 18 or older
 * @throws {Error} Throws "UNDERAGE" if age < 18
 */
export function validateAge(birthDate) {
    // TODO
}

/**
 * Validates a zip code.
 * Must be exactly 5 digits.
 * @param {string} zip - Zip code
 * @returns {boolean} Returns true if zip is valid
 * @throws {Error} Throws "INVALID_ZIP" if zip is invalid
 */
export function validateZipCode(zip) {
    // TODO
}

/**
 * Validates identity (name/first name).
 * Only letters, accents, and hyphens are allowed.
 * Rejects simple XSS patterns.
 * @param {string} identity - Name or first name
 * @returns {boolean} Returns true if identity is valid
 * @throws {Error} Throws "INVALID_IDENTITY" for invalid characters
 * @throws {Error} Throws "XSS_DETECTED" for simple XSS patterns
 */
export function validateIdentity(identity) {
    // TODO
}

/**
 * Validates an email address.
 * Must be in standard email format.
 * @param {string} email - Email to validate
 * @returns {boolean} Returns true if email is valid
 * @throws {Error} Throws "INVALID_EMAIL" if email format is incorrect
 */
export function validateEmail(email) {
    // TODO
}
