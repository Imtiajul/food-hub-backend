import { Response, Request } from "express";
import { providerService } from "./provider.service";
import { UserRole } from "../../../prisma/generated/prisma/enums";


const addProvider = async (req: Request, res: Response) => {
    try {
        const result = await providerService.addProvider(req.body, req.user?.id as string);
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Adding Meal Failed",
            details: error
        })
    }
}
const getProviders = async (req: Request, res: Response) => {
    try {
        const result = await providerService.getProviders();
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Fetching Provider Failed",
            details: error
        })
    }
}
const getProviderById = async (req: Request, res: Response) => {
    try {
        const {providerId} = req.params;
        const result = await providerService.getProviderById(providerId as string);
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Fetching Provider Item Failed",
            details: error
        })
    }
}
const createMeal = async (req: Request, res: Response) => {
    try {
        const result = await providerService.createMeal(req.body, req.user?.id as string);
        console.log("controllr", result);
        res.status(201).json({ result });
    } catch (error: any) {
        res.status(400).json({
            error: "Adding Meal Failed",
            details: error
        })
        // console.log("error")
    }
}
const updateMeal = async (req: Request, res: Response) => {
    try {
        const isAdmin = req.user?.role === UserRole.ADMIN;
        const isProvider = req.user?.role === UserRole.PROVIDER;
        const { mealId} = req.params;
        console.log(mealId as string, req.body, isProvider, isAdmin, "provider controler");
        const result = await providerService.updateMeal(mealId as string, req.body, isProvider, isAdmin);
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Updating Meal Item is Failed",
            details: error
        })
    }
}
const deleteMealById = async(req: Request, res: Response) => {
    try {
        const { mealId} = req.params;
        const result = await providerService.deleteMealById(mealId as string);
        res.status(201).json({ result });
    }  catch (error: any) {
        res.status(400).json({
            error: "Item deletion unsuccessful. Try Again.",
            details: error
        })
    }
}
const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await providerService.createCategory(req.body);
        res.status(201).json({ result });
    } catch (error: any) {
        res.status(400).json({
            error: "Adding Category Failed",
            details: error
        })
    }
}


const getCategory = async (req: Request, res: Response) => {
    try {
        const result = await providerService.getCategory();
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Fetching Category is Failed",
            details: error
        })
    }
}
const updateCategory = async (req: Request, res: Response) => {
    try {
        const isAdmin = req.user?.role === UserRole.ADMIN;
        const isProvider = req.user?.role === UserRole.PROVIDER;
        const { categoryId } = req.params;
        const result = await providerService.updateCategory(categoryId as string, req.body, isProvider, isAdmin);
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Updating Category is Failed",
            details: error
        })
    }
}

export const providerController = {
    createMeal, addProvider, createCategory, getProviders, getCategory, updateCategory, getProviderById, updateMeal, deleteMealById,
}
