import express from "express"
import authenticateUser from "./middleware"
import getAllRoomsHandler from "./roomRoutes/getAllRoomsHandler"
import createRoomHandler from "./roomRoutes/createRoomHandler"
import getUsersInRoomHandler from "./roomRoutes/getUsersInRoomHandler"
import joinRoomHandler from "./roomRoutes/joinRoomHandler"
import leaveRoomHandler from "./roomRoutes/leaveRoomHandler"
import deleteRoomHandler from "./roomRoutes/deleteRoomHandler"
import getUserRoomsHandler from "./roomRoutes/getUserRoomsHandler"

const router = express.Router()

router.post("/create", authenticateUser, createRoomHandler)
router.get("/all", getAllRoomsHandler)
router.get("/users/:roomId", authenticateUser, getUsersInRoomHandler)
router.get("/myrooms", authenticateUser, getUserRoomsHandler)
router.post("/join/:roomId", authenticateUser, joinRoomHandler)
router.post("/leave/:roomId", authenticateUser, leaveRoomHandler)
router.delete("/delete/:roomId", authenticateUser, deleteRoomHandler)

export default router
