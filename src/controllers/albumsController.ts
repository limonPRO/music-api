import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { con } from "../utils/db";

const albumController = {
  createAlbum: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      con.query(
        "INSERT INTO albums (title , release_year , genre ) VALUES (? , ? , ?)",
        [req.body.title, req.body.release_year, req.body.genre],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ message: "album is succesfully created" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateAlbum: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existAlbums: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM albums WHERE id = ?",
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

      if (existAlbums.length > 0) {
        con.query(
          "UPDATE albums SET `title`=? , `release_year`=?, `genre`=? WHERE id=?",
          [
            req.body.title,
            req.body.release_year,
            req.body.genre,
            req.params.id,
          ],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ message: "Albums  updated successfully" });
          }
        );
      } else {
        res.status(400).json({
          message: `albums with this id doest not exist ${req.params.id}`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAlbum: async (req: Request, res: Response) => {
    try {
      const existAlbums: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM albums WHERE id = ?",
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

      if (existAlbums.length > 0) {
        con.query(
          "SELECT * FROM albums WHERE id = ?",
          [req.params.id],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else {
        res.status(400).json({
          message: `albums with this id doest not exist ${req.params.id}`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteAlbum: async (req: Request, res: Response) => {
    try {
      const existAlbum: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM albums WHERE id = ?",
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

      if (existAlbum.length > 0) {
        con.query(
          "DELETE FROM albums WHERE id=?",
          [req.params.id],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ message: "Albums deleted successfully" });
          }
        );
      } else {
        res.status(400).json({
          message: `albums with this id doest not exist ${req.params.id}`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllAlbum: async (req: Request, res: Response) => {
    try {
      con.query("SELECT * FROM albums", function (err: any, result: any) {
        if (err) throw err;
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default albumController;
