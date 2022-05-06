import Hash from "../lib/Hash";

describe('Hash.ts', () => {

    const length1 = 12;
    const length2 = 20;
    let returnVal1: string;
    let returnVal2: string;

    test('length check', () => {
        returnVal1 = Hash.create(length1);
        returnVal2 = Hash.create(length2);
        expect(returnVal1.length).toBe(length1);
        expect(returnVal2.length).toBe(length2);
    });

    test('unique check', () => {
        const length12 = Hash.create(length1);
        const length20 = Hash.create(length2);
        expect(length12).not.toBe(returnVal1);
        expect(length20).not.toBe(returnVal2);
    });

});
