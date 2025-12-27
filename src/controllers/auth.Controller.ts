import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const result = await AuthService.signup(username, email, password);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("CONTROLLER ERROR 👉", error);

    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

//Login

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const result = await AuthService.signin(email, password);

    if (!result.ok) {
      if (
        result.reason === "EMAIL_NOT_FOUND" ||
        result.reason === "INVALID_PASSWORD"
      ) {
        return res.status(404).json({
          message: "Password or Email incorrect",
        });
      }

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
