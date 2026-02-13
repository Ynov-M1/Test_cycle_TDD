import {validateEmail, validateIdentity, validatePerson, validateZipCode} from "../src/domain/validator.js";
import { validateAge } from "../src/domain/validator.js";

describe("validatePerson Unit Test Suites", () => {
    it("should throw INVALID_PERSON if param is missing or invalid", () => {
        expect(() => validatePerson()).toThrow("MISSING_PARAM: person");
        expect(() => validatePerson(null)).toThrow("MISSING_PARAM: person");
        expect(() => validatePerson("not an object")).toThrow("MISSING_PARAM: person");
    });

    it("should throw MISSING_PARAM for missing fields", () => {
        expect(() => validatePerson({})).toThrow("MISSING_PARAM: birthDate");
        expect(() => validatePerson({ birthDate: new Date() })).toThrow("MISSING_PARAM: zip");
        expect(() => validatePerson({ birthDate: new Date(), zip: "75001" })).toThrow("MISSING_PARAM: identity");
        expect(() => validatePerson({ birthDate: new Date(), zip: "75001", identity: "Jean" })).toThrow("MISSING_PARAM: email");
    });

    it("should throw PARAM_TYPE_ERROR for wrong field types", () => {
        const base = { birthDate: new Date(), zip: "75001", identity: "Jean", email: "test@mail.com" };
        expect(() => validatePerson({ ...base, birthDate: "2000-01-01" })).toThrow("PARAM_TYPE_ERROR: birthDate must be a Date");
        expect(() => validatePerson({ ...base, zip: 75001 })).toThrow("PARAM_TYPE_ERROR: zip must be a string");
        expect(() => validatePerson({ ...base, identity: 123 })).toThrow("PARAM_TYPE_ERROR: identity must be a string");
        expect(() => validatePerson({ ...base, email: 123 })).toThrow("PARAM_TYPE_ERROR: email must be a string");
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

describe("validateAge Unit Test Suites", () => {
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

describe("validateZipCode Unit Test Suites", () => {
    it("should throw INVALID_ZIP for invalid codes", () => {
        ["1234", "ABCDE", null, "123456", ].forEach(zip => {
            expect(() => validateZipCode(zip)).toThrow("INVALID_ZIP");
        });
    });

    it("should accept a valid code", () => {
        expect(validateZipCode("03100")).toBe(true);
    });
});

describe("validateIdentity Unit Test Suites", () => {
    it("should throw INVALID_IDENTITY for numbers or symbols", () => {
        ["Theo3", "Theo@"].forEach(identity => {
            expect(() => validateIdentity(identity)).toThrow("INVALID_IDENTITY");
        })
    });

    it("should throw INVALID_IDENTITY for bad type", () => {
        expect(() => validateIdentity(123)).toThrow("INVALID_IDENTITY");
    });

    it("should throw XSS_DETECTED for script", () => {
        expect(() => validateIdentity("<script>")).toThrow("XSS_DETECTED");
    });

    it("should accept valid names", () => {
        ["Jean-Luc", "Élodie", "Maël"].forEach(identity => {
            expect(validateIdentity(identity)).toBe(true);
        })
    });
});

describe("validateEmail Unit Test Suites", () => {
    it("should throw INVALID_EMAIL for invalid emails", () => {
        ["test@", "@mail.com", "test@mail", null, ].forEach(email => {
            expect(() => validateEmail(email)).toThrow("INVALID_EMAIL");
        });
    });

    it("should accept valid emails", () => {
        expect(validateEmail("test@mail.com")).toBe(true);
    });
});