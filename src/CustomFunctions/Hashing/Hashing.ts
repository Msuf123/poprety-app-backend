import bcrypt from 'bcrypt';


export const hashPassword = async (plainPassword) => {
    const saltRounds = 3;

    try {
       
        const salt = await bcrypt.genSalt(saltRounds);

        
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        return hashedPassword; 
    } catch (error) {
        console.log(error)
        return null
    }
};

export const verifyPassword = async (plainPassword:string, hashedPassword:string) => {
    try {
        
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; 
    } catch (error) {
        console.log(error)
        return null
    }
};
