import express from "express"
import auth from "../../middleware/auth";
import { orderController } from "./order.controller";
import { UserRole } from "../../lib/type";

const router = express.Router();

router.post('/', auth(UserRole.CUSTOMER), orderController.createOrder);
router.get('/', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrder);
router.get('/:orderId', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrderById);


export const orderRouter = router;