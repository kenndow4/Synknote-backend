import { Request, Response } from "express";

export const signUp = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fiel are required" });
  if (name.length < 3)
    return res
      .status(400)
      .json({ message: "Name must have ar least 3 characters" });
  if (!email.includes("@"))
    return res.status(400).json({ message: "Email must be a real email" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password Must have at least 6 characters" });

  return res.json({ name, email, password });
};
