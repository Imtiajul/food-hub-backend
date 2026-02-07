import express from "express"
import auth from "../../middleware/auth";
import { UserRole } from "../../lib/type";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post('/', auth(UserRole.CUSTOMER), reviewController.addReview);
router.get('/:mealId', reviewController.getAllReviewByMealId);      //public

export const reviewRouter = router;