import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const createReactionHandler: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId
  const { messageId, type } = req.body

  if(!userId) {
    res.status(401).json({errMes: "Unauthorized!"})
    return
  }
  if(!messageId || !type) {
    res.status(400).json({errMes: "missing messageId or reaction type"})
  }

  try{
    //might break if the user tries to react again 
    const reaction = await prisma.messageReaction.upsert({
      where: {
        userId_messageId_type: {
          userId,
          messageId,
          type,
        }
      },
      update: {
        type
      },
      create: {
        userId,
        messageId,
        type
      }
    })

    res.status(200).json(reaction)
  } catch(e) {
    console.error(e)
    res.status(400).json({errMes: "Error reacting to the message"})
  }

}

export default createReactionHandler
