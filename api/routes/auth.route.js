import { Router } from "express";
// import { signUp } from "../controllers/auth.controllers.js";
import { signUp } from "../controllers/auth.controllers.js ";


const router = Router();

router.route("/sign-up").post(signUp);


export default router;