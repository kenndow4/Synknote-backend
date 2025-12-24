import userModel from "../model/auth.model";
import { UserPayload } from "../types/user";
import { Hash } from "../utils/hash";
import { Token } from "../utils/token";


export class AuthService {

    static async signin(email:string, password:string){
        const user:UserPayload | null = await userModel.findOne({email});
        if(!user) return {ok:false, reason: "Email_not_found"}
        const isValidPassword = await Hash.verify(user.password, password);
        if (!isValidPassword) return {ok: false, reason: "INVALID_PASSWORD",};
        const token:string = Token.generate({id:user._id, email:user.email});

        return {
            ok:true,
            user:{
                id:user._id,
                userName: user.username,
                email:user.email,
            },
            token
            
        }
    }
}