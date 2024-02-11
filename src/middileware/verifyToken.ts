import { Request, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const verifyUserToken = (req: Request, res: Response, next: any) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized request" });

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(401).json({ message: "Unauthorized request" });

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verifiedUser)
      return res.status(401).json({ message: "Unauthorized request" });

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
