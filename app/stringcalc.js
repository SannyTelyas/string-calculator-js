import {lessThan, sum} from './common/numbers';
import {toInt, removeChars, getStringFrom, splitByAny, replaceAll, getStringBetween} from './common/strings';
import {tap, map, reduce, pipe, filter, split} from 'Ramda';

const hasHeader = (string) => string.startsWith("//");

const getDelimiters = (string) => {
    const cleanCorchets = removeChars("[]");

    const extractDelimiters = pipe(
        getStringBetween("//","\n"),
        split("]["),
        map(cleanCorchets)
    );

    return hasHeader(string) ? extractDelimiters(string) : [","];
};

const extractBody = (text) => {
    const getBody = getStringFrom('\n');
    return hasHeader(text) ? getBody(text) : text;
};

const checkNegatives = (numbers) => {
    const negativePieces = numbers.filter(lessThan(0));
    if (negativePieces.length > 0) throw new Error("negatives not allowed: " + negativePieces.join(","));
};

const clean = replaceAll("\n");

export default string => {

    const delimiters = getDelimiters(string);

    const work = pipe(
        extractBody,
        clean,
        splitByAny(delimiters),
        map(toInt),
        filter(lessThan(1000)),
        tap(checkNegatives),
        reduce(sum,0)
    );

    return work(string);
}
