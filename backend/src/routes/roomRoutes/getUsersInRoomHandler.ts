import { Request, RequestHandler, Response } from "express"
import prisma from "../../config/prisma"

//Get users in a room
const getUsersInRoomHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.roomId
    if (await prisma.room.findFirst({ where: { id: roomId } })) {
      const users = await prisma.user.findMany({
        where: {
          rooms: { some: { id: roomId } }
        }
      })
      res.status(200).json(users)
      return
    }
    res.status(404).json({ errMes: "room does not exist!" })
  } catch (e) {
    console.error(e)
    res.status(500).json({ errMes: "Error Fetching Users in Room" })
  }
}

export default getUsersInRoomHandler
