import express from "express"
import authenticateUser from "./middleware"
import fetchOldMessagesHandler from "./messageRoutes/fetchOldMessagesHandler"
import createMessagesHandler from "./messageRoutes/createMessagesHandler"
import markAsViewedHandler from "./messageRoutes/markAsViewedHandler"
import createReactionHandler from "./messageRoutes/createReactionHandler"

const router = express.Router()

router.get("/fetchOldMessages/:roomId", authenticateUser, fetchOldMessagesHandler)
router.post("/createNewMessage/:roomId", authenticateUser, createMessagesHandler )
router.post("/markAsViewed", authenticateUser, markAsViewedHandler)
router.post("/react", authenticateUser, createReactionHandler)

export default router
