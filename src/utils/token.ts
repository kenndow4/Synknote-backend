import jwt from "jsonwebtoken";
import env from "../config/env";

const JWT_SECRET:string = env.jwt_secret as string;

interface TokenPayload {
    id: string;
    email: string;
}

export class Token {

    static generate(payload:TokenPayload){

        return jwt.sign(payload, JWT_SECRET,{
            expiresIn: "1d"
        });
    }

    static verify (token:string){
       return jwt.verify(token, JWT_SECRET) as TokenPayload;
    };

}