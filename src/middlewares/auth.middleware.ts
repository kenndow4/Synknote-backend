import { Request, Response, NextFunction } from "express";
import { Token } from "../utils/token";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try{
        const authHeader = req.headers.authorization;

        if (!authHeader) return res.status(401).json({message: "No token provided"});

        const token =  authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Invalid token format" });

        const decoded = Token.verify(token);

        req.user = decoded;
        next();

    }catch(e){
        return res.status(401).json({message: "Invalid or expired token"})
    }

}
