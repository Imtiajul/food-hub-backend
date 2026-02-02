import { prisma } from "../../lib/prisma"

const getAllMeal = async () => {
    return await prisma.meal.findMany();
}

const getMealById = async(id: string) => {
    return await prisma.meal.findUniqueOrThrow({where: {id}})

}


export const mealService = {
    getAllMeal, getMealById
}