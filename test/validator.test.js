import {validateIdentity, validatePerson, validateZipCode} from "../src/validator";
import { validateAge } from "../src/validator";

describe("validatePerson Unit Test Suites", () => {
    it("should throw INVALID_PERSON if param is missing or invalid", () => {
        expect(() => validatePerson()).toThrow("MISSING_PARAM: person");
        expect(() => validatePerson(null)).toThrow("MISSING_PARAM: person");
        expect(() => validatePerson("not an object")).toThrow("MISSING_PARAM: person");
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

describe("validateZipCode RED", () => {
    it("should throw INVALID_ZIP for invalid codes", () => {
        ["1234", "ABCDE", null, "123456"].forEach(zip => {
            expect(() => validateZipCode(zip)).toThrow("INVALID_ZIP");
        });
    });

    it("should accept a valid code", () => {
        expect(validateZipCode("03100")).toBe(true);
    });
});

describe("validateIdentity RED", () => {
    it("should throw INVALID_IDENTITY for numbers or symbols", () => {
        expect(() => validateIdentity("Theo3")).toThrow("INVALID_IDENTITY");
        expect(() => validateIdentity("Theo@")).toThrow("INVALID_IDENTITY");
    });

    it("should throw XSS_DETECTED for script", () => {
        expect(() => validateIdentity("<script>")).toThrow("XSS_DETECTED");
    });

    it("should accept valid names", () => {
        expect(validateIdentity("Jean-Luc")).toBe(true);
        expect(validateIdentity("Élodie")).toBe(true);
    });
});