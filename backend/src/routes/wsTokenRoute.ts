import express, { Request, Response } from "express";
import authenticateUser from "./middleware";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/ws-token", authenticateUser, (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    res.status(401).json({ errMes: "Unauthorized!" });
    return;
  }

  const wsToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });

  res.status(200).json({ token: wsToken });
});

export default router;
