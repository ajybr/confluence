import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const markAsViewedHandler: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId
  const { messageIds } = req.body

  if(!userId) {
    res.status(401).json({errMes: "Unauthoried"})
    return
  }
  if(!messageIds || messageIds.length === 0) {
    res.status(400).json({errMes: "No messageIds provided"})
    return
  }

  try{
    const viewedData = messageIds.map(( messageId: string ) => ({
      messageId,
      userId,
      viewedAt: new Date()
    }))

    await prisma.messageView.createMany({
      data: viewedData,
      skipDuplicates:true,
    })
     res.status(200).json({ message: "Marked as viewed" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ errMes: "Failed to mark messages as viewed" })
  }
}

export default markAsViewedHandler
