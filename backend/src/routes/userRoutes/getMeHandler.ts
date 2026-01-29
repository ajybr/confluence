import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const getMeHandler: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ errMes: "Unauthorized! User ID not found" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        bio: true,
      },
    });
    res.status(200).json(user);
    return;
  } catch (e) {
    console.error("err in /me: ", e);
    res
      .status(401)
      .json({ errMes: "Error authenticating user. Please sign in again" });
  }
};
export default getMeHandler;
