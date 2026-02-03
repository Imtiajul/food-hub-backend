import express from "express"
import auth from "../../middleware/auth";
import { UserRole } from "../../lib/type";
import { providerController } from "./provider.controller";

const router = express.Router();

router.post("/meals", auth(UserRole.PROVIDER), providerController.createMeal);
router.patch("/meals/:mealId", auth(UserRole.PROVIDER), providerController.updateMeal);
router.delete("/meals/:mealId", auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.deleteMealById);

router.post("/category", auth(UserRole.PROVIDER), providerController.createCategory);
router.get("/category", auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.getCategory);
router.patch("/category/:categoryId", auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.updateCategory);

router.get("/", providerController.getProviders);
router.get("/:providerId", providerController.getProviderById);
router.post("/", auth(UserRole.PROVIDER), providerController.addProvider);

export const providerRouter = router;