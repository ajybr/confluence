import { Request, RequestHandler, Response } from "express";

const signoutHandler: RequestHandler = (_: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ mes: "Signout Successful!" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ errMes: "Error occurred while signing out" });
  }
};

export default signoutHandler;
