import {tap, map, reduce, pipe} from 'Ramda';

const toInt = (a) => parseInt(a, 10);

const sum = (a, b) => a + b;
const hasHeader = (string) => string.indexOf("//") === 0;
const removeCorchet = (string) => string.replace("[", "").replace("]", "");
const splitCorchets = (string) => string.split("][").map(removeCorchet);

const extractDelimiters = (string) => splitCorchets(string.substr(2, string.indexOf("\n") - 2));
const extractBodyWhenHeader = (string) => string.substr(string.indexOf("\n"));
const extractBody = (text) => hasHeader(text) ? extractBodyWhenHeader(text) : text;

const isNegative = (number) => number < 0;
const checkNegatives = (numbers) => {
    const negativePieces = numbers.filter(isNegative);
    if (negativePieces.length > 0) throw new Error("negatives not allowed: " + negativePieces.join(","));
};
const multipleSplit = (delimiters) => (string) => {
    const getRegExp = (delimiters) => new RegExp("[" + delimiters.join("|") + "]");
    return string.split(getRegExp(delimiters));
};
const clean = (delimiters) => (body) => body.trim().replace("\n", delimiters[0]);

const filter = (fn) => (array) => array.filter(fn);

const lessThan = (number) => (a) => a < number;

const getDelimiters = (string) => hasHeader(string) ? extractDelimiters(string) : [","];

export default string => {

    const delimiters = getDelimiters(string);

    const work = pipe(
        extractBody,
        clean(delimiters),
        multipleSplit(delimiters),
        map(toInt),
        filter(lessThan(1000)),
        tap(checkNegatives),
        reduce(sum,0)
    );

    return work(string);
}
