import userModel from "../model/auth.model";
import { UserRepository } from "../Repository/auth.repository";
import { UserPayload } from "../types/user";
import { Hash } from "../utils/hash";
import { Token } from "../utils/token";
import generateAvatar from "../utils/avatar";

export class AuthService {
  static async signup(username: string, email: string, password: string) {
    if (!username || !email || !password)
      return { ok: false, message: "All fields are required" };

    if (username.length < 3)
      return { ok: false, message: "Name must have at least 3 characters" };

    if (password.length < 6)
      return { ok: false, message: "Password must have at least 6 characters" };

    // Check if user already exists
    const usernameExists = await UserRepository.findByUsername(username);
    if (usernameExists)
      return { ok: false, message: "Username already registered" };
    const emailExists = await UserRepository.findByEmail(email);
    if (emailExists) return { ok: false, message: "Email already registered" };

    try {
      const passwordHash = await Hash.hash(password);
      const avatar = generateAvatar.generate(username);
      const newUser = await UserRepository.createUSer({
        username,
        email,
        password: passwordHash,
        avatar,
      });

      await newUser.save();

      const token: string = Token.generate({
        id: newUser._id.toString(),
        email: newUser.email,
      });

      return {
        ok: true,
        id: newUser._id.toString(),
        user: newUser.username,
        email: newUser.email,
        avatar,
        token,
      };
    } catch (error) {
      return { ok: false, message: "Error creating user" };
    }
  }

  static async signin(email: string, password: string) {
    const user: UserPayload | null = await userModel.findOne({ email });
    if (!user) return { ok: false, reason: "Email_not_found" };
    const isValidPassword = await Hash.verify(user.password, password);
    if (!isValidPassword) return { ok: false, reason: "INVALID_PASSWORD" };
    const token: string = Token.generate({ id: user._id, email: user.email });

    return {
      ok: true,
      user: {
        id: user._id,
        userName: user.username,
        email: user.email,
      },
      token,
    };
  }
}
