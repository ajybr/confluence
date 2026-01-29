import { Request, RequestHandler, Response } from "express"
import prisma from "../../config/prisma"

//Leave a Room
const leaveRoomHandler: RequestHandler = async (req: Request, res: Response) => {
  try{
    const roomId = req.params.roomId
  const userId = req.user?.userId

  if(!userId){
    res.status(400).json({errMes: "Unauthorized!"})
  }
  if(!roomId){
    res.status(400).json({errMes: "Missing roomId."})
  }

  const inRoom = await prisma.room.findFirst({
    where: {
      id: roomId,
      users: {some: { id: userId }}
    }
  })
  if(!inRoom) {
    res.status(400).json({errMes: "User is not in the room"})
    return
  }

  const updatedRoom = await prisma.room.update({
    where: {id: roomId},
    data: {
      users: {
        disconnect: {id: userId}
      }
    },
    include: {users: true}
  })
  res.status(200).json(updatedRoom.users)
  return
}catch (e) {
    console.error(e)
    res.status(500).json({ errMes: "Error Leaving Room" })
  }
}

export default leaveRoomHandler

