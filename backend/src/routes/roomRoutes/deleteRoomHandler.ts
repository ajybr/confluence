import { Request, Response } from "express"
import prisma from "../../config/prisma"

export const deleteRoomHandler = async (req: Request<{ roomId: string }> , res: Response) => {
  const roomId =  req.params.roomId
  const userId = req.user?.userId

  if(!userId) {
    res.status(401).json({errMes: "Unauthorized"})
  }

  if (!roomId) {
    res.status(400).json({ errMes: "Missing room ID" })
    return
  }
  const userIsOwner = await prisma.room.findFirst({
    where: {
      id: roomId,
      createdById: userId
    }
  })

  if(!userIsOwner) {
    res.status(400).json({errMes: "Only creator of the room can delete it."})
    return
  }
  try {
    const deletedRoom = await prisma.room.delete({
      where: { id: roomId },
    })
    res.status(200).json({ message: `Room ${deletedRoom.roomName} deleted successfully` })
  } catch (e) {
    console.error(e)
    res.status(500).json({ errMes: "Failed to delete room" })
  }
}

export default deleteRoomHandler
