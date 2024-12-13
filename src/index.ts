import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './Connection/Connection'
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Example route: Hello World
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from Express with TypeScript!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection failed:', err);
            process.exit(1); // Exit the process if the connection fails
        } else {
            console.log('Connected to the database successfully!');
            connection.release(); // Release the connection back to the pool
        }
    });
});
