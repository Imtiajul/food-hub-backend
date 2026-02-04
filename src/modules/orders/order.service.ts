import { Order } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createOrder = async(data: Order, customerId: string) => {
    // console.log(data, customerId);
    return await prisma.order.create({
        data: {
            ...data,
            customerId
        }
    })
}

const getOrder = async(customerId: string) => {
    return await prisma.order.findMany({
        where: {
            customerId
        }
    })
}

const getOrderById = async(id: string) => {
    return await prisma.order.findMany({
        where: {
            id
        }
    })
}

export const orderService = {
    createOrder, getOrder, getOrderById
}