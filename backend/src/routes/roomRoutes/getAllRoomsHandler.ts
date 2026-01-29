import { Request, RequestHandler, Response } from "express"
import prisma from "../../config/prisma"

//Get all rooms
const getAllRoomsHandler: RequestHandler = async (_: Request, res: Response) => {
try { const rooms = await prisma.room.findMany({include: {createdBy: true}})
    res.status(200).json(rooms) }
  catch(e) {
    console.error(e)
    res.status(500).json({errMes: "Error fetching rooms"})
  }
}

export default getAllRoomsHandler
