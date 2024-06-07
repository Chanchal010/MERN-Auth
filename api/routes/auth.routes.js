import express from "express";
import { googleAuth, signIn, signUp } from "../controllers/auth.controllers.js";
 

const router = express.Router();

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.post("/google-signin",googleAuth)



export default router;