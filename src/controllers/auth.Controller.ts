import { Request, Response } from "express";
import userModel from "../model/auth.model";
import argon2 from "argon2";
import { Token } from "../utils/token";
import { AuthService } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });
  if (username.length < 3)
    return res
      .status(400)
      .json({ message: "Name must have at least 3 characters" });
  if (!email.includes("@"))
    return res.status(400).json({ message: "Email must be a real email" });
  if (password.length < 6)
    return res.status(400).json({
      message: "Password must have at least 6 characters",
    });
  // Check if user already exists
  const userExists = await userModel.findOne({ email });
  if (userExists)
    return res.status(409).json({ message: "Email already registered" });

  try {
    // Hash the password
    const passwordhash = await argon2.hash(password);

    // Create new user
    const newUser = new userModel({
      username,
      email,
      password: passwordhash,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      id: newUser._id,
      user: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


//Login

export const  signin = async(req:Request, res:Response) => {
  const {email, password} = req.body;

  if(!email || !password) return res.status(400).json({message: "All fields are required"});

  try{
        const result = await AuthService.signin(email, password);

    if (!result.ok) {
      if (result.reason === "EMAIL_NOT_FOUND" || result.reason === "INVALID_PASSWORD") {
        return res.status(404).json({
          message: "Password or Email incorrect",
        });
      }

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    return res.status(200).json(result);


  }catch(e){
    return res.status(500).json({ message: "Internal server error" });
  }


}