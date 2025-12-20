import { Router } from "express";
import { signUp } from "../controllers/authController";

const router:Router = Router();

router.post("/signup", signUp);

export default router;