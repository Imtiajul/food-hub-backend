import { Meal, Review } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma"

const addReview = async (data: Omit<Review, "id" | "createdAt">, customerId: string) => {
    return await prisma.review.create({
        data: {
            ...data,
            customerId,
        }
    })
}

const getAllReviewByMealId = async (mealId: string) => {
    return await prisma.review.findMany({ where: { mealId } });
}

export const reviewService = {
    addReview, getAllReviewByMealId
}