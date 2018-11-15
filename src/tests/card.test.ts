import {
    empty,
    luhnChk,
} from "../utils/cardUtil";

describe("Utility Group: Validation Expressions", () => {
    let testString: string;

    describe("Util: empty", () => {
        it("Should function as intended", () => {
            expect(empty(null)).toBeTruthy();
            (testString = undefined) && expect(empty(testString)).toBeTruthy();
            (testString = null) && expect(empty(testString)).toBeTruthy();
            (testString = "") && expect(empty(testString)).toBeTruthy();
            (testString = "test") && expect(empty(testString)).toBeFalsy();
            (testString = " ") && expect(empty(testString)).toBeFalsy();
        });
    });

    describe("Util: luhnChk", () => {
        it("Should function as intended", () => {
            expect(luhnChk(null)).toBeFalsy();
            (testString = undefined) && expect(luhnChk(testString)).toBeFalsy();
            (testString = null) && expect(luhnChk(testString)).toBeFalsy();
            (testString = "4111111111111111") && expect(luhnChk(testString)).toBeTruthy();
            (testString = "1111111111111111") && expect(luhnChk(testString)).toBeFalsy();
            (testString = "5555555555554444") && expect(luhnChk(testString)).toBeTruthy();
            (testString = "378282246310005") && expect(luhnChk(testString)).toBeTruthy();
        });
    });
});
