import { error } from "node:console";
import { Order, OrderStatus } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../lib/type";
import { stat } from "node:fs";

const createOrder = async (data: Order, customerId: string) => {
    // console.log(data, customerId);
    return await prisma.order.create({
        data: {
            ...data,
            customerId
        }
    })
}

const getOrder = async (customerId: string) => {
    const getUserRole = await prisma.user.findUniqueOrThrow({
        where: { id: customerId },
        include: {
            providerProfile:
            {
                select: {
                    id: true,
                    restaurantName: true
                }
            }
        }
    });
    // admin get all Order info
    if (getUserRole.role === UserRole.ADMIN) {
        return await prisma.order.findMany();

    }

    //provider
    if (getUserRole.role === UserRole.PROVIDER) {
        // returning each provider profile
        const promises = getUserRole.providerProfile.map(async (provider: { id: string, restaurantName: string }) => {
            // console.log(provider.id)
            const providerOrder = await prisma.order.findMany({
                where: {
                    providerId: provider.id
                }
            })
            return { ProviderName: provider.restaurantName, ProviderId: provider.id, providerOrder };
        })

        return await Promise.all(promises);

    }
    return await prisma.order.findMany({
        where: {
            customerId
        }
    })

    //customer
    return await prisma.order.findMany({
        where: {
            customerId
        }
    })

}

const getOrderById = async (id: string) => {
    return await prisma.order.findMany({
        where: {
            id
        }
    })
}

const updateOrderStatus = async (id: string, data: Partial<Order>, user: string) => {
// const updateOrderStatus = async (id: string, status: OrderStatus, user: string) => {
    // console.log(id, data, user);
    // checking order if it's ready
    if (user === UserRole.CUSTOMER) {
        const orderState = await prisma.order.findUnique({ where: { id }, select:{ status: true} })
        console.log(orderState);
        if(orderState?.status === OrderStatus.READY) {
            throw new Error("The Order is already Ready. You can't change now.");
        }
    }

    return await prisma.order.update({
        where: {
            id
        },
        data,
    });
}

export const orderService = {
    createOrder, getOrder, getOrderById, updateOrderStatus
}