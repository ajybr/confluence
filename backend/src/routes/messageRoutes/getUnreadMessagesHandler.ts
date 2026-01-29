import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const getUnreadMessagesHandler: RequestHandler = async (req: Request, res: Response) => {
  const roomId = req.params.roomId
  const userId = req.user?.userId

  if (!roomId) {
    res.status(400).json({ errMes: "Missing or Invalid roomId" })
    return
  }
  if (!userId) {
    res.status(401).json({ errMes: "Unauthenticated" })
    return
  }

  try {
    const viewed = await prisma.messageView.findMany({
      where: {
        userId,
        message: {
          roomId
        }
      },
      select: {
        messageId: true
      }
    })
    const viewedIds = viewed.map((v: {messageId: string} ) => v.messageId)

    const unreadMessages = await prisma.message.findMany({
      where: {
        roomId,
        NOT: {
          id: { in: viewedIds }
        }
      },
      orderBy: {
        timestamp: 'asc'
      },
      include: {
        sender: true
      }
    })
    res.status(200).json(unreadMessages)
  } catch (e) {
    res.status(400).json({ errMes: "Error fetching unread messages" })
  }
}

export default getUnreadMessagesHandler
