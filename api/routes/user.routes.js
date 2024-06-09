import express from "express"
import { verifyUser } from "../utils/verifyUser.js"
import { updateUser } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/update-user/:id", verifyUser, updateUser)


export default router