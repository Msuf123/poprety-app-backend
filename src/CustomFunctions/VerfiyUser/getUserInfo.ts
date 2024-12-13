import { verifyPassword } from '../Hashing/Hashing';
import { createToken } from '../JWtToken/JWtToken';
import pool from './../../Connection/Connection'
export default async function getUser(username: string) {
    return new Promise((resolve, reject) => {

        // Query to find the user by email
        const query = 'SELECT * FROM user WHERE email_id = ?';
        const rows: any = pool.query(query, [username], async (err, res: any) => {
            if (err) {
                resolve(false)
            }
            else {
               resolve(res[0])
            }
        })
    })
}