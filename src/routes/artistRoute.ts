import { Router } from "express";
import { body } from "express-validator";
import { verifyUserToken } from "../middileware/verifyToken";
import artistController from "../controllers/artistController";

const router = Router();

const taskValidationRules = [
  body("name").notEmpty().withMessage("name is required"),
];

router.post(
  "/",
  verifyUserToken,
  taskValidationRules,
  artistController.createArtist
);
router.put(
  "/:id",
  verifyUserToken,
  taskValidationRules,
  artistController.updateArtist
);
router.delete("/:id", verifyUserToken, artistController.deleteArtist);
router.get("/", verifyUserToken, artistController.getAllArtist);
router.get("/:id", verifyUserToken, artistController.getArtist);

export default router;
