const toIntOne = (a) => a === "" ? 0 : parseInt(a);
const toInt = (array) => array.map(toIntOne);

const sum = (a, b) => a + b;
const theSum = (pieces) => pieces.reduce(sum, 0);
const hasHeader = (string) => string.indexOf("//") === 0;
const removeCorchet = (string) => string.replace("[","").replace("]","");
const splitCorchets = (string) => string.split("][").map(removeCorchet);

const extractDelimiters = (string) => splitCorchets(string.substr(2, string.indexOf("\n") - 2));
const extractBodyWhenHeader = (string) => string.substr(string.indexOf("\n"));
const extractBody = (text) => hasHeader(text) ? extractBodyWhenHeader(text) : text;

const isNegative = (number) => number < 0;
const checkNegatives = (numbers) => {
    const negativePieces = numbers.filter(isNegative);
    if (negativePieces.length > 0) throw new Error("negatives not allowed: " + negativePieces.join(","));
};
const getSplitterFn = (delimiters) => (string) => {
    const getRegExp = (delimiters) => new RegExp("["+delimiters.join("|")+"]");
    return string.split(getRegExp(delimiters));
};
const getCleanerFn = (delimiters) => (body) => body.trim().replace("\n", delimiters[0]);

const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

export default class StringCalculator {

    add(numbers) {
        const delimiters = hasHeader(numbers) ? extractDelimiters(numbers) : [","];
        const split = getSplitterFn(delimiters);
        const clean = getCleanerFn(delimiters);

        const getPiecesInt = pipe(
            extractBody,
            clean,
            split,
            toInt
        );

        const piecesInt = getPiecesInt(numbers);
        checkNegatives(piecesInt);
        return theSum(piecesInt);
    }
}

