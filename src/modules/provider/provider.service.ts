import { Category, Meal, ProviderProfile } from "../../../prisma/generated/prisma/client";
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
const getProviders = async () => {
  const result = await prisma.providerProfile.findMany();
  // console.log(result);
  return result
}
const getProviderById = async (id:string) => {
  const result = await prisma.providerProfile.findUniqueOrThrow({where: {id}});
  // console.log(result);
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
const createCategory = async (data: Category) => {
  return await prisma.category.create({ data });
}
const getCategory = async () => {
  return await prisma.category.findMany();
}

const updateCategory = async (categoryId: string, data: Partial<Category>, isProvider?: boolean, isAdmin?: boolean) => {
  // console.log(postId, data, authorId);

  const catData = await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId
    }
  });
  console.log(catData);
  console.log(data);
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
  createMeal, addProvider, createCategory, getProviders, updateCategory, getCategory, getProviderById,
}