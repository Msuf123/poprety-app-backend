import { verifyPassword } from '../Hashing/Hashing';
import { createToken } from '../JWtToken/JWtToken';
import pool from './../../Connection/Connection'
export default async function verifyUser(username:string,password:string){
    return new Promise((resolve,reject)=>{
      
            // Query to find the user by email
            const query = 'SELECT * FROM user WHERE email_id = ?';
            const rows: any = pool.query(query, [username],async(err,res:any)=>{
                if(err){
                    resolve(false)
                }
                else{
                    console.log(res)
                    if(res.length===0){
                        resolve(false)
                    }
                    else{
                        const passwodr = await verifyPassword(password, res.password)
                        console.log("user passwodrd match is ",passwodr)
                        const token = createToken(res.email_id)
                        resolve(token)
                    }
                }
            })})
        }