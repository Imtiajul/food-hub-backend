import { Category, Meal, Provider } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";



const addProvider = async (data: Provider, userId: string) => {
  //  console.log("Provider Profile");
  const result = await prisma.provider.create({
    data: {
      ...data,
      userId,
    }
  });
  console.log(result);
  return result
}
const getProviders = async () => {
  const result = await prisma.provider.findMany();
  // console.log(result);
  return result
}
const getProviderById = async (id: string) => {
  const result = await prisma.provider.findUniqueOrThrow({ where: { id } });
  // console.log(result);
  return result
}


const createMeal = async (data: Omit<Meal, "id" | "createdAt" | "updatedAt">, userId: string) => {
  // console.log(data);
  // const providerId = await prisma.user.findMany({
  //   include: {
  //     providerProfile: {
  //       select: {
  //         id: true,
  //       },
  //     },
  //   },
  // })
  // console.log(providerId);

  const result = await prisma.meal.create({
    data: {
      ...data
    }
  })
  // console.log(result)
  return result;
}


const updateMeal = async (mealId: string, data: Partial<Meal>, isProvider?: boolean, isAdmin?: boolean) => {
  console.log(mealId, data, 'service');
  const mealData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealId
    },
    select: {
      id: true
    }
  });
  console.log(mealData);

  if (!isAdmin && !isProvider) {
    throw new Error("You are not authoriszed to update this meal data!");
  }

  return await prisma.meal.update({
    where: {
      id: mealData.id,
    },
    data
  })
}

const deleteMealById = async (mealId: string) => {
  const mealData = await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    select: {
      id: true
    }
  });
  if (!mealData?.id) {
    throw new Error("Operation failded. Provider Id not found.");
  }
  return await prisma.meal.delete({ where: { id: mealData.id } })
}

const createCategory = async (data: Category) => {
  return await prisma.category.create({ data });
}
const getCategory = async () => {
  return await prisma.category.findMany();
}



const updateCategory = async (categoryId: string, data: Partial<Category>, isProvider?: boolean, isAdmin?: boolean) => {
  const catData = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId
    }
  });
  // console.log(catData);
  // console.log(data);
  //only user
  if (!isAdmin && !isProvider) {
    throw new Error("You are not authoriszed to update this data!");
  }

  return await prisma.category.update({
    where: {
      id: catData.id,
    },
    data
  })
}


export const providerService = {
  createMeal, addProvider, createCategory, getProviders, updateCategory, getCategory, getProviderById, updateMeal, deleteMealById,
}