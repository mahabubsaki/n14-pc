
import bcrypt from 'bcrypt';
async function passwordMatcher(input, actual) {
    const result = await bcrypt.compare(input, actual);
    return result;
}
export default passwordMatcher;