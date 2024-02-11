import { Router } from "express";
import { body } from "express-validator";
import { verifyUserToken } from "../middileware/verifyToken";
import songController from "../controllers/songController";

const router = Router();

const taskValidationRules = [
  body("title").notEmpty().withMessage("title is required"),
  body("duration ").notEmpty().withMessage("duration  is required"),
  body("album_id ").notEmpty().withMessage("album_id  is required"),
];

router.post(
  "/",
  verifyUserToken,
  taskValidationRules,
  songController.createSong
);
router.put(
  "/:id",
  verifyUserToken,
  taskValidationRules,
  songController.updateSong
);
router.delete("/:id", verifyUserToken, songController.deleteSong);
router.get("/", verifyUserToken, songController.getAllSong);
router.get("/:id", verifyUserToken, songController.getSong);
router.get("/albums/:albumId", verifyUserToken, songController.getSongByAlbum);

export default router;
