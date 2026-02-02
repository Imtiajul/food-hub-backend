import express from "express"
import auth from "../../middleware/auth";
import { mealController } from "./meal.controller";

const router = express.Router();

router.get("/", mealController.getAllMeal);
router.get("/:mealId", mealController.getMealById);


export const mealRouter = router;