import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { con } from "../utils/db";

const albumArtistController = {
  createAlbumArtist: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      con.query(
        "INSERT INTO album_artists (album_id , artist_id ) VALUES (? , ?)",
        [req.body.album_id, req.body.artist_id],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ message: "succesfully created" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateAlbumArtist: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existAlbums: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM album_artists WHERE id = ?",
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
          "UPDATE album_artists SET `album_id`=? , `artist_id`=? WHERE id=?",
          [req.body.album_id, req.body.artist_id, req.params.id],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ message: "updated successfully" });
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

  getAlbumArtist: async (req: Request, res: Response) => {
    try {
      const existAlbums: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM album_artists WHERE id = ?",
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
          "SELECT * FROM album_artists WHERE id = ?",
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
          message: `this id does not exist ${req.params.id}`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteAlbumArtist: async (req: Request, res: Response) => {
    try {
      const existAlbum: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM album_artists WHERE id = ?",
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
          "DELETE FROM album_artists WHERE id=?",
          [req.params.id],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ message: "deleted successfully" });
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

  getAllAlbumArtists: async (req: Request, res: Response) => {
    try {
      con.query(
        "SELECT * FROM album_artists",
        function (err: any, result: any) {
          if (err) throw err;
          res.json(result);
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default albumArtistController;
