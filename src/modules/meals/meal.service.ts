import { Meal } from "../../../prisma/generated/prisma/client";
import { MealWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma"

const getAllMeal = async ({ search, categoryId, isAvailable, isFeatured, PriceMax, PriceMin, page, limit, skip, sortBy, sortOrder }: {
    search: string | undefined,
    categoryId: string | undefined,
    isAvailable: boolean | undefined,
    isFeatured: boolean | undefined,
    PriceMax: number | undefined,
    PriceMin: number | undefined,
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}) => {
    // console.log(search, categoryId, isAvailable, isFeatured, page, limit, skip, sortBy, sortOrder)
    const andConditions: MealWhereInput[] = [];

    if (search) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
            ]
        })
    }
    // console.log(PriceMin, PriceMax);
    if (PriceMin) {
        andConditions.push({
            OR: [
                {
                    price: {
                        gte: PriceMin,
                    }
                }
            ]
        }
        )
    }
    if (PriceMax) {
        andConditions.push({
            OR: [
                {
                    price: {
                        lte: PriceMax,
                    }
                }
            ]
        }
        )
    }

    if (categoryId) {
        andConditions.push({ categoryId })
    }

    if (typeof isAvailable === "boolean") {
        andConditions.push({ isAvailable })
    }

    if (typeof isFeatured === "boolean") {
        andConditions.push({ isFeatured })
    }
    console.log(andConditions);
    const totalMeals = await prisma.meal.findMany({
        take: limit,
        skip,
        where: {
            AND: andConditions,
        },
        orderBy: {
            [sortBy]: sortOrder,
        }
    });

    const total = await prisma.meal.count();

    return {
        data: totalMeals,
        pagination: {
            total,
            page,
            limit,
            totalPage: Math.ceil(total / limit),
        }
    }
}

const getMealById = async (id: string, data: Meal) => {
    return await prisma.meal.findUniqueOrThrow({ where: { id } })

}


export const mealService = {
    getAllMeal, getMealById
}