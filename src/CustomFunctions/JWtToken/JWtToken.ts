import jwt from 'jsonwebtoken';
const JWT_SECRET ='your-secret-key';

export const createToken = (email: string) => {
    
    const payload = { email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
};
export const verifyToken = (token: string):any => {
    try {
        
        const decoded = jwt.verify(token, JWT_SECRET); 
        return decoded; 
    } catch (err) {
        console.log(err)
        return null
    }
};
