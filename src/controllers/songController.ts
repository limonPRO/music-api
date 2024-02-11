import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { con } from "../utils/db";

const songController = {
  createSong: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      con.query(
        "INSERT INTO songs (title , duration , album_id  ) VALUES (? , ? , ?)",
        [req.body.title, req.body.duration, req.body.album_id],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ message: "song is succesfully created" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateSong: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      con.query(
        "UPDATE songs SET `title`=? , `duration=?`,`album_id=?`  WHERE id=?",
        [req.body.title, req.body.duration, req.body.album_id, req.params.id],
        (err: any, result: any) => {
          if (err) {
            throw err;
          }
          res.status(200).json({ message: "song updated successfully" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSong: async (req: Request, res: Response) => {
    try {
      con.query(
        `
                SELECT songs.id, songs.title AS song_title, songs.duration, 
                       albums.id, albums.title AS album_title, albums.release_year, albums.genre
                FROM songs
                JOIN albums ON songs.album_id = albums.id  WHERE songs.id = ?;
              `,
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

  getSongByAlbum: async (req: Request, res: Response) => {
    try {
      const albumId = req.params.albumId;
      const sql = "SELECT * FROM songs WHERE album_id = ?";
      con.query(sql, [albumId], (err: any, result: any) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteSong: async (req: Request, res: Response) => {
    try {
      const existArtist: any = await new Promise((resolve, reject) => {
        con.query(
          "SELECT * FROM songs WHERE id = ?",
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
          "DELETE FROM songs WHERE id=?",
          [req.params.id],
          (err: any, result: any) => {
            if (err) {
              throw err;
            }
            res.status(200).json({ message: "Songs deleted successfully" });
          }
        );
      } else {
        res.status(400).json({
          message: `Songs with this id doest not exist ${req.params.id}`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllSong: async (req: Request, res: Response) => {
    try {
      con.query(
        `
            SELECT songs.id, songs.title AS song_title, songs.duration, 
                   albums.id, albums.title AS album_title, albums.release_year, albums.genre
            FROM songs
            JOIN albums ON songs.album_id = albums.id;
          `,
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

export default songController;
