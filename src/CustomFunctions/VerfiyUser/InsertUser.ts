import pool from "../../Connection/Connection";


export default async function InsertUser(email_id: string, password: string, phone_number: string):Promise<boolean> {
    return new Promise(async(resolve,reject)=>{
        try {
            // SQL query to insert a new user
            const query = `
            INSERT INTO user (email_id, password, phone_number, image)
            VALUES (?, ?, ?, ?)
        `;
            const image = 'https://avatars.githubusercontent.com/u/88485149?v=4'
            // Use the pool.query method to insert data securely using parameterized queries
            const result = await pool.promise().query(query, [email_id, password, phone_number, image]);

            console.log("User inserted successfully", result);
            resolve(true)

        } catch (error) {
            console.error("Error inserting user: ", error);
             resolve(false)
        }
    })
   
}
