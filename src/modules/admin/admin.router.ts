import express from "express"
import auth from "../../middleware/auth";
import { adminController } from "./admin.controller";
import { UserRole } from "../../lib/type";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), adminController.getAllUser);


export const adminRouter = router;