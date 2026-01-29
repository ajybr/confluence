import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

//get all rooms that this user is part of
const getUserRoomsHandler: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ errMes: "Unauthorized: User ID not found" });
      return;
    }

    const userRooms = await prisma.room.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
    res.status(200).json(userRooms);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMes: "Error Fetching Rooms for this User!" });
  }
};

export default getUserRoomsHandler;
