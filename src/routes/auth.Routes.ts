import { Router } from "express";
import { signin, signUp } from "../controllers/auth.Controller";

const router: Router = Router();

router.post("/signup", signUp);
router.post("/signin", signin);

export default router;
