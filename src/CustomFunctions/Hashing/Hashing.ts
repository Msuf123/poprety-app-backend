import bcrypt from 'bcrypt';


export async function hashPassword  (plainPassword:string) {
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

export  async function verifyPassword (plainPassword:string, hashedPassword:string){
    try {
        
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; 
    } catch (error) {
        console.log(error)
        return null
    }
};
