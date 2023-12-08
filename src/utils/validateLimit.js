export default function validateLimit(input, array, defaults) {
    return array.includes(input) ? input : defaults;
}