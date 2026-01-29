import { Request, RequestHandler, Response } from "express"
import prisma from "../../config/prisma"

//Join a room
const joinRoomHandler: RequestHandler = async (req: Request, res: Response) => {
  try{ const roomId = req.params.roomId
  const userId = req.user?.userId

  if (!userId) {
    res.status(401).json({ errMes: "Unauthorized" })
    return
  }
  if (!roomId) {
    res.status(401).json({ errMes: "Missing roomId" })
    return
  }

  const user = await prisma.user.findFirst({ where: { id: userId } })
  const room = await prisma.room.findUnique({ where: { id: roomId } })

  const existingMember = await prisma.room.findFirst({
    where: {
      id: roomId,
      users: {
        some: { id: userId }
      }
    }
  })

  if (existingMember) {
    res.status(401).json({ errMes: `User ${user?.username} is Already in Room ${room?.roomName}` })
    return
  }

  const updatedRoom = await prisma.room.update({
    where: {
      id: roomId
    },
    data: {
      users: {
        connect: { id: userId }
      }
    },
    include: { users: true }
  })

  res.status(200).json({ roomName: updatedRoom.roomName, users: updatedRoom.users })
  return
  } catch(e) {
     console.error(e)
    res.status(500).json({ errMes: "Error Joining Room" })
  }
}

export default joinRoomHandler
