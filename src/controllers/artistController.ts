import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { con } from "../utils/db";

const artistController = {
  createArtist: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      con.query(
        "INSERT INTO artist (name) VALUES (?)",
        [req.body.name],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ message: "artist is succesfully created" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateArtist: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      con.query(
        "UPDATE artist SET `name`=? WHERE id=?",
        [req.body.name, req.params.id],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "Artist  updated successfully" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getArtist: async (req: Request, res: Response) => {
    try {
      con.query(
        "SELECT * FROM artist WHERE id = ?",
        [req.params.id],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(200).json(result);
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteArtist: async (req: Request, res: Response) => {
    try {
      const existArtist: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM artist WHERE id = ?",
          [req.params.id],
          (err: any, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });

      if (existArtist.length > 0) {
        con.query(
          "DELETE FROM artist WHERE id=?",
          [req.params.id],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ message: "Artist deleted successfully" });
          }
        );
      } else {
        res.status(400).json({
          message: `artist with this id doest not exist ${req.params.id}`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllArtist: async (req: Request, res: Response) => {
    try {
      con.query("SELECT * FROM artist", function (err: any, result: any) {
        if (err) throw err;
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default artistController;
