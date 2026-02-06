import {calculateAge} from "./module";

/**
 * Validates all parameters for a person
 * @param {Object} person - { birthDate, zip, identity, email }
 * @param {Date} person.birthDate - Date of birth
 * @param {string} person.zip - French zip code (5 digits)
 * @param {string} person.identity - Name/first name (letters, accents, hyphens)
 * @param {string} person.email - Email address
 * @returns {true} if everything is valid
 * @throws {Error} MISSING_PARAM, PARAM_TYPE_ERROR, UNDERAGE, INVALID_ZIP, INVALID_IDENTITY, XSS_DETECTED, INVALID_EMAIL
 */
export function validatePerson(person) {
    if (!person || typeof person !== "object") {
        throw new Error("MISSING_PARAM: person");
    }

    if (!person.birthDate) throw new Error("MISSING_PARAM: birthDate");
    if (!person.zip) throw new Error("MISSING_PARAM: zip");
    if (!person.identity) throw new Error("MISSING_PARAM: identity");
    if (!person.email) throw new Error("MISSING_PARAM: email");

    if (!(person.birthDate instanceof Date)) throw new TypeError("PARAM_TYPE_ERROR: birthDate must be a Date");
    if (typeof person.zip !== "string") throw new TypeError("PARAM_TYPE_ERROR: zip must be a string");
    if (typeof person.identity !== "string") throw new TypeError("PARAM_TYPE_ERROR: identity must be a string");
    if (typeof person.email !== "string") throw new TypeError("PARAM_TYPE_ERROR: email must be a string");

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
 * @throws {Error} UNDERAGE if age < 18, INVALID_DATE if birthDate is invalid
 */
export function validateAge(birthDate) {
    if (!(birthDate instanceof Date) || Number.isNaN(birthDate.getTime())) {
        throw new TypeError("INVALID_DATE");
    }

    const age = calculateAge({birth: birthDate});
    if (age < 18) throw new Error("UNDERAGE");

    return true;
}

/**
 * Validates a zip code.
 * Must be exactly 5 digits.
 * @param {string} zip - Zip code
 * @returns {boolean} Returns true if zip is valid
 * @throws {Error} Throws "INVALID_ZIP" if zip is invalid
 */
export function validateZipCode(zip) {
    if (typeof zip !== "string" || !/^\d{5}$/.test(zip)) {
        throw new Error("INVALID_ZIP");
    }
    return true;
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
    if (typeof identity !== "string") throw new Error("INVALID_IDENTITY");
    if (/<[^>]*>/.test(identity)) throw new Error("XSS_DETECTED");
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/.test(identity)) throw new Error("INVALID_IDENTITY");
    return true;
}

/**
 * Validates an email address.
 * Must be in standard email format.
 * @param {string} email - Email to validate
 * @returns {boolean} Returns true if email is valid
 * @throws {Error} Throws "INVALID_EMAIL" if email format is incorrect
 */
export function validateEmail(email) {
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("INVALID_EMAIL");
    }
    return true;
}
