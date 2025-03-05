import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

export default generateToken