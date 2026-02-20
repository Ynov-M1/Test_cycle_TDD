/**
 * Adds a person to the list if email is unique.
 *
 * @param {Array<Object>} persons - Current persons list
 * @param {Object} person - Person to add
 * @returns {Array<Object>} Updated persons list
 * @throws {Error} EMAIL_ALREADY_EXISTS if email already used
 */
export function addPerson(persons, person) {
    const emailExists = persons.some(
        p => p.email.toLowerCase() === person.email.toLowerCase()
    );

    if (emailExists) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    return [...persons, person];
}