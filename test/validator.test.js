import { validatePerson } from "../src/validator"

describe("validatePerson Unit Test Suites", () => {
    it("should throw INVALID_PERSON if param is missing or invalid", () => {
        expect(() => validatePerson()).toThrow("INVALID_PERSON");
        expect(() => validatePerson(null)).toThrow("INVALID_PERSON");
        expect(() => validatePerson("not an object")).toThrow("INVALID_PERSON");
    });

    it("should validate a correct person object", () => {
        const person = {
            birth: new Date("09/02/2001"),
            zip: "75001",
            identity: "Jean",
            email: "jean@mail.com"
        };

        expect(validatePerson(person)).toBe(true);
    });
});
