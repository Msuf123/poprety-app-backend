import pool from "../../Connection/Connection";
export default function checkIfUserNameIsUnique(name:string){
    return new Promise((resolve,reject)=>{
        pool.query('SELECT email_id FORM user WHERE email_id=?',[name],(err,res:any)=>{
            if(err){
                console.log(err)
                reject(false)
            }
            else{
                console.log("This is the result cheching suernamne",res)
                if(res.length===0){
                    resolve(true)
                }
                else{
                    reject(false)
                }
            }
        })
    })
}