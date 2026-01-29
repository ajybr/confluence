import { Request, RequestHandler, Response } from "express"
import prisma from "../../config/prisma"

//Create room
const createRoomHandler: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId
  let { roomName, description } = req.body
  if(!description) {
    description = `Welcome to ${roomName}. \nJoin the conversation!`
  }
  if(!userId){
    res.status(401).json({errMes: "Unauthorized!"})
  }
  try {
    const room = await prisma.room.create({
      data: { 
        roomName,
        description,
        createdBy: { connect: { id: userId } },
        users: { connect: { id: userId }},
      },
      include: {
        users: true,
      }
    })
    res.status(201).json(room)
    return
  } catch (e) {
    res.status(500).json({ mes: "Error Creating Room!" })
  }
}

export default createRoomHandler
