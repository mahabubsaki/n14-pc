import bcrypt from 'bcrypt';
async function passwordHasher(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export default passwordHasher;


