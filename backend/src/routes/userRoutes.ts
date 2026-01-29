import express from "express"
import signupHandler from "./userRoutes/signupHandler"
import signinHandler from "./userRoutes/signinHandler"
import signoutHandler from "./userRoutes/signoutHandler"
import deleteUserHandler from "./userRoutes/deleteUserHandler"
import authenticateUser from "./middleware"
import getMeHandler from "./userRoutes/getMeHandler"

const router = express.Router()

router.post("/signup", signupHandler)
router.post("/signin", signinHandler)
router.post("/signout", signoutHandler)
router.delete("/delete", authenticateUser, deleteUserHandler)
router.get('/me', authenticateUser, getMeHandler)
export default router
