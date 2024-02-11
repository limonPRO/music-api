import { Router } from "express";
import userController from "../controllers/userController";
import { body } from "express-validator";

const router = Router();

const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const loginValidationRules = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/registration", userValidationRules, userController.registerUser);
router.post("/login", loginValidationRules, userController.login);
router.get("/", userController.allusers);

export default router;
