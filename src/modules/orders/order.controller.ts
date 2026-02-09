import { Request, Response } from "express";
import { orderService } from "./order.service";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        // console.log(userId);
        const result = await orderService.createOrder(req.body, userId as string);
        res.status(200).json({ result })
    } catch (error: any) {
        res.status(400).json({
            error: "Order Creation Failed!",
            details: error
        })
        // console.log("error")
    }
}
const getOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const result = await orderService.getOrder(userId as string);
        res.status(200).json({ result })
    } catch (error) {
        res.status(400).json({
            error: "Order Fetching Failed!",
            details: error
        })
    }
}
const getOrderById = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        // console.log(orderId);
        const result = await orderService.getOrderById(orderId as string);
        res.status(200).json({ result })
    } catch (error) {
        res.status(400).json({
            error: "Order Fetching Failed!",
            details: error
        })
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        // console.log(orderId);
        const user = req.user?.role;

        const result = await orderService.updateOrderStatus(orderId as string, req.body, user as string);
        res.status(200).json({ result })
    } catch (error: any) {
        res.status(400).json({
            error: "Order Updating Failed!",
            message: error.message,
            detail: error
        })
    }
}

const addOrderItem = async (req: Request, res: Response) => {
    try {
        const {orderId} = req.params;
        // console.log(userId);
        const result = await orderService.addOrderItem(orderId as string, req.body);
        res.status(200).json({ result })
    } catch (error: any) {
        res.status(400).json({
            error: "Order Item Creation Failed!",
            details: error
        })
        // console.log("error")
    }

}


export const orderController = {
    createOrder, getOrder, getOrderById, updateOrderStatus, addOrderItem
}