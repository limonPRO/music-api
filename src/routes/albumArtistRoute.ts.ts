import { Router } from "express";
import { body } from "express-validator";
import { verifyUserToken } from "../middileware/verifyToken";
import albumArtistController from "../controllers/albumArtist";

const router = Router();

const taskValidationRules = [
  body("title").notEmpty().withMessage("title is required"),
  body("release_year").notEmpty().withMessage("release_year is required"),
  body("genre").notEmpty().withMessage("genre is required"),
];

router.post(
  "/",
  verifyUserToken,
  taskValidationRules,
  albumArtistController.createAlbumArtist
);
router.put(
  "/:id",
  verifyUserToken,
  taskValidationRules,
  albumArtistController.updateAlbumArtist
);
router.delete("/:id", verifyUserToken, albumArtistController.deleteAlbumArtist);
router.get("/", verifyUserToken, albumArtistController.getAllAlbumArtists);
router.get("/:id", verifyUserToken, albumArtistController.getAlbumArtist);

export default router;
