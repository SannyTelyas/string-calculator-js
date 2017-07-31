import StringCalculator from './stringcalc'

const CASES = [
    ["should add empty string", "", 0],
    ["should add one number", "2", 2],
    ["should add two numbers greater than 10", "15,10", 25],
    ["should add three numbers", "9,20,10", 39],
    ["should add numbers in new lines", "1\n2,3", 6],
    ["should be able to use a different delimiter", "//;\n2;3", 5],
    ["should be able to use a different delimiter version 2", "//|\n2|3|5", 10],
    ["should be able to use a different delimiter with great length", "//[XZ]\n2XZ3XZ9", 14],
    ["should be able to use different delimiters", "//[XZ][|][m]\n2XZ3m9|4", 18],
    ["should ignore numbers greater than 1000", "//[XZ][|][m]\n2XZ1003m9|4", 15],
];

const EXCEPTION_CASES = [
    ["should fail with one negative number", "-1", "negatives not allowed: -1"],
    ["should fail with two negatives number", "//;\n-1;-5", "negatives not allowed: -1,-5"],

];

describe("StringCalculator - sums", () => {
    CASES.forEach((data) => {
        it(data[0], () => {
            const sc = new StringCalculator();
            const result = sc.add(data[1]);
            expect(result).to.equal(data[2]);
        });
    });
});


describe("StringCalculator - fails", () => {
    EXCEPTION_CASES.forEach((data) => {
        it(data[0], () => {
            const sc = new StringCalculator();
            const fn = () => sc.add(data[1]);
            expect(fn).to.throw(data[2]);
        });
    });
});