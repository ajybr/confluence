import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const createMessagesHandler: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const roomId = req.params.roomId;
  const userId = req.user?.userId;

  const { content, mediaUrl, replyToId } = req.body;

  if (!userId) {
    res.status(401).json({ errMes: "Unauthorized!" });
    return;
  }
  if (!roomId) {
    res.status(400).json({ errMes: "Missing or Invalid roomId" });
    return;
  }
  if (!content) {
    res.status(400).json({ errMes: "Missing content" });
    return;
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        content,
        roomId,
        senderId: userId,
        ...(mediaUrl && { mediaUrl }),
        ...(replyToId && { replyToId }),
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
        room: {
          select: {
            id: true,
          },
        },
      },
    });

    res.status(200).json(newMessage);
  } catch (e) {
    console.error(e);
    res.status(500).json("Error while creating new message");
  }
};

export default createMessagesHandler;
