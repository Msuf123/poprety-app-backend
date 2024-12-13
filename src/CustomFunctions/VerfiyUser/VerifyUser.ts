import { verifyPassword } from '../Hashing/Hashing';
import pool from './../../Connection/Connection'
export default async function verifyUser(username:string,password:string){
    try {
        // Query to find the user by email
        const query = 'SELECT * FROM user WHERE email_id = ?';
        const rows:any = await pool.promise().query(query, [username]);
        console.log(rows)
        if (rows.length === 0) {
           
            return null;
        }

        const user = rows[0];


        const passwordMatch = await verifyPassword(password, user.password)

        if (passwordMatch) {
            // If passwords match, return the user data
            return {
                email_id: user.email_id,
                password: user.password,
                phone_number: user.phone_number,
                image: user.image
            };
        } else {
            // If passwords don't match, return null
            return null;
        }

    } catch (error) {
        console.error('Error in user authentication:', error);
        return null;
    }
}