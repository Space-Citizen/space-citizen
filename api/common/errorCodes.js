var ERROR_CODES = {
    TOKEN_INVALID: 0,
    TOKEN_EXPIRED: 1
}

Object.freeze(ERROR_CODES);


if (typeof module != 'undefined') {
    module.exports = ERROR_CODES;
}
else {
    window.ERROR_CODES = ERROR_CODES;
}