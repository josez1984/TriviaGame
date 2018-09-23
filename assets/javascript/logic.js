function randN(multiplier, plus) {
    return Math.floor(Math.random() * multiplier) + plus;
}
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
   