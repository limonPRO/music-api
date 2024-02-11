import { Router } from "express";
import { body } from "express-validator";
import { verifyUserToken } from "../middileware/verifyToken";
import albumController from "../controllers/albumsController";

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
  albumController.createAlbum
);
router.put(
  "/:id",
  verifyUserToken,
  taskValidationRules,
  albumController.updateAlbum
);
router.delete("/:id", verifyUserToken, albumController.deleteAlbum);
router.get("/", verifyUserToken, albumController.getAllAlbum);
router.get("/:id", verifyUserToken, albumController.getAlbum);

export default router;
