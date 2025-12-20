import { Router } from "express";
import { signUp } from "../controllers/auth.Controller";

const router: Router = Router();

router.post("/signup", signUp);

export default router;
