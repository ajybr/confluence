import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const fetchOldMessagesHandler: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const roomId = req.params.roomId;
    const userId = req.user?.userId;

    if (!roomId) {
      res.status(401).json({ errMes: "Room does not Exist!" });
      return;
    }

    const inRoom = await prisma.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (!inRoom) {
      res.status(400).json({ errMes: "You are not part of this room" });
      return;
    }

    const messages = await prisma.message.findMany({
      where: {
        roomId,
      },
      include: {
        sender: {
          select: {
            username: true,
            id: true,
          },
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    res.status(200).json(messages);
  } catch (e) {
    console.error(e);
    res.status(400).json({ errMes: "error while fetching old messages" });
  }
};

export default fetchOldMessagesHandler;
