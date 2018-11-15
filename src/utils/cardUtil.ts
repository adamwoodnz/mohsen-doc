/**
 * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
 * @author ShirtlessKirk. Copyright (c) 2012.
 * @license WTFPL (http://www.wtfpl.net/txt/copying)
 */
export function luhnChk(value) {
    const luhn = value.replace(/\s/g, "");
    let len = luhn.length,
        mul = 0,
        sum = 0;
    const prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];

    while (len--) {
        sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
        mul ^= 1;
    }

    return sum % 10 === 0 && sum > 0;
}

export function empty(value: string) {
    if (value && value.length > 0) {
        return false;
    }
    return true;
}

export function lengthCheck(value: string, len: number) {
    if (value && value.length === len) {
        return false;
    }
    return true;
}

export function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
