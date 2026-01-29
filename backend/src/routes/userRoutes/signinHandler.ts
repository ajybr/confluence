import { Request, RequestHandler, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable.");
}

//User Signin
const signinHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (user) {
      // if(await argon2.verify(user.password, password))
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          JWT_SECRET!,
        );
        res
          .cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .json({
            user: { id: user.id, username: user.username, bio: user.username },
            success: true,
            message: `Logged in as ${user.username}`,
          });
        return;
      }
      res.status(400).json({ errMes: "Invalid Password" });
      return;
    }
    res.status(400).json({ errMes: "Invalid Username" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ errMes: "Error occurred while sign in" });
  }
};

export default signinHandler;
