import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";

const deleteUserHandler: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId
  if (!userId) {
    res.status(401).json({ errMes: "Unauthorized!" })
  }
  try {
    const deletedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isDeleted: true,
        username: `deleted-${Date.now()}`,
        password: "",
        bio: ""
      }
    })
    res.status(200).json(deletedUser)
  } catch (e) {
    console.error(e)
    res.status(400).json({ errMes: "Error deleting user." })
  }
}

export default deleteUserHandler
