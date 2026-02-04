import { User } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getAllUser = async () => {
    return await prisma.user.findMany();
}

const updateUserById = async (data: User, id: string) => {
    return await prisma.user.update({
        where: {
            id
        },
        data,
    })
}

export const adminService = {
    getAllUser, updateUserById,
}