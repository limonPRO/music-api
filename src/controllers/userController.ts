import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { hashPassword, validatePassword } from "../utils/utl";
import { con } from "../utils/db";
import { User } from "../types/types";
require("dotenv").config();

const userController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existUser: User[] = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM users WHERE email = ?",
          [req.body.email],
          (err: any, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });

      if (existUser.length > 0) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      const hashedPassword = await hashPassword(req.body.password);

      con.query(
        "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)",
        [req.body.name, req.body.email, hashedPassword],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.json({
            message: "successfully registered",
          });
        }
      );
    } catch (error) {
      console.error("Error occurred during user registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existUser: any = await new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM users WHERE email = ?",
        [req.body.email],
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (existUser.length > 0) {
      const machedPassword = await validatePassword(
        req.body.password,
        existUser[0].password
      );

      if (machedPassword) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: existUser[0],
          },
          process.env.JWT_SECRET as string
        );

        res.status(201).json({
          user: existUser[0],
          token: token,
        });
      } else {
        res.status(404).send("wrong credentials");
      }
    } else {
      res.status(404).send("wrong credentials");
    }
  },

  allusers: (req: Request, res: Response) => {
    con.query("SELECT * FROM users", function (err: any, result: any) {
      if (err) throw err;
      res.json(result);
    });
  },
};

export default userController;
