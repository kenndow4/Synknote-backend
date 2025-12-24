import dotenv from "dotenv";


dotenv.config();


const { PORT, DATABASE_URL, JWT_SECRET } = process.env;

export default {
    port: PORT,
    database_url: DATABASE_URL,
    jwt_secret: JWT_SECRET,
}