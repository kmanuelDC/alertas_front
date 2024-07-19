export const hasNullOrZero = (obj) => {
    // console.log(Array.isArray(obj))
    if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some(value => value === '' || value === 0);
    } else {
        return false;
    }
}