import { prisma } from "../../lib/prisma"

const getMyDetails = async (id:string) => {
    return await prisma.user.findUnique({where: {id}})
}


export const meService = {
    getMyDetails
}