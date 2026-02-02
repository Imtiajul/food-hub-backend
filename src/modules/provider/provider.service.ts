import { Meal, ProviderProfile } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";



const addProvider = async (data: ProviderProfile, userId: string) => {
    //  console.log("Provider Profile");
    const result = await prisma.providerProfile.create({
        data: {
            ...data,
            userId,
        }
    });
    console.log(result);
    return result
}

const createMeal = async (data: Omit<Meal, "id" | "createdAt" | "updatedAt">, providerId: string) => {
    console.log(data);
    const result = await prisma.meal.create({
        data: {
            ...data,
            providerId
        }
    })
    console.log(result)
    return result;
}

export const providerService = {
    createMeal, addProvider
}