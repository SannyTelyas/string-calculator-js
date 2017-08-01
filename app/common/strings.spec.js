import {removeChars} from './strings'


describe("RemoveChars", () => {
    it("should remove one char", () => {
        const result = removeChars("x")("helloxworld");
        expect(result).to.equal("helloworld");
    });

    it("should remove several chars", () => {
        const result = removeChars("xlw")("helloxworld");
        expect(result).to.equal("heoord");
    });

    it("should remove special chars", () => {
        const result = removeChars("[")("in[it");
        expect(result).to.equal("init");
    });
});
