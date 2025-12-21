import dotenv from "dotenv";


dotenv.config();


const { PORT, DATABASE_URL } = process.env;

export default {
    port: PORT,
    database_url: DATABASE_URL,
}