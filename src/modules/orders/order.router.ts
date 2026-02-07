import express from "express"
import auth from "../../middleware/auth";
import { UserRole } from "../../lib/type";
import { orderController } from "./order.controller";

const router = express.Router();

router.post('/', auth(UserRole.CUSTOMER), orderController.createOrder);
router.get('/', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrder);
router.get('/:orderId', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrderById);
router.patch('/:orderId', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.updateOrderStatus);


export const orderRouter = router;