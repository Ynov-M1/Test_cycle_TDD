import {calculateAge} from "../src/module"

describe('calculateAge Unit Test Suites', () => {
    it('should return a correct age', () => {
        const loise = {
            birth: new Date("09/02/2001")
        };
        expect(calculateAge(loise)).toEqual(24)
    })
})