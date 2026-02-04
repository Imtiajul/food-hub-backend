import express from "express"
import auth from "../../middleware/auth";
import { UserRole } from "../../lib/type";
import { meController } from "./me.controller";

const router = express.Router();

router.get('/', auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.PROVIDER), meController.getMyDetails);


export const meRouter = router;