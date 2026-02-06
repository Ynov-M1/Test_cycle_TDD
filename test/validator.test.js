import { validatePerson } from "../src/validator";
import { validateAge } from "../src/validator";

describe("validatePerson Unit Test Suites", () => {
    it("should throw INVALID_PERSON if param is missing or invalid", () => {
        expect(() => validatePerson()).toThrow("INVALID_PERSON");
        expect(() => validatePerson(null)).toThrow("INVALID_PERSON");
        expect(() => validatePerson("not an object")).toThrow("INVALID_PERSON");
    });

    it("should validate a correct person object", () => {
        const person = {
            birthDate: new Date("09/02/2001"),
            zip: "03100",
            identity: "Théo",
            email: "theo@mail.com"
        };

        expect(validatePerson(person)).toBe(true);
    });
});

describe("validateAge RED", () => {
    it("should throw UNDERAGE if age < 18", () => {
        const child = new Date(new Date().getFullYear() - 10, 0, 1);
        expect(() => validateAge(child)).toThrow("UNDERAGE");
    });

    it("should throw INVALID_DATE if birthDate is invalid", () => {
        expect(() => validateAge(null)).toThrow("INVALID_DATE");
        expect(() => validateAge("abc")).toThrow("INVALID_DATE");
        expect(() => validateAge(new Date("invalid date"))).toThrow("INVALID_DATE");
    });

    it("should accept adult", () => {
        const adult = new Date(new Date().getFullYear() - 20, 0, 1);
        expect(validateAge(adult)).toBe(true);
    });
});