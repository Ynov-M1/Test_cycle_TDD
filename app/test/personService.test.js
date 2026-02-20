import {addPerson} from "../src/domain/personService.js";

describe("addPerson", () => {

    const user = {
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com"
    };

    it("should add person if email is unique", () => {
        const result = addPerson([], user);
        expect(result).toHaveLength(1);
    });

    it("should throw if email already exists", () => {
        expect(() => addPerson([user], user))
            .toThrow("EMAIL_ALREADY_EXISTS");
    });

});