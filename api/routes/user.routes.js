import express from "express"
import { verifyUser } from "../utils/verifyUser.js"
import { updateUser , deleteUser} from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/update-user/:id", verifyUser, updateUser)
router.delete("/delete-user/:id", verifyUser, deleteUser)


export default router