import express from "express"
import auth from "../../middleware/auth";
import { UserRole } from "../../lib/type";
import { providerController } from "./provider.controller";

const router = express.Router();

router.post("/meals", auth(UserRole.PROVIDER), providerController.createMeal);
router.post("/",auth(UserRole.PROVIDER), providerController.addProvider);

export const providerRouter = router;