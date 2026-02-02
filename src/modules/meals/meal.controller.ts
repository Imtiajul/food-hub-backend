import { Request, Response } from "express";
import { mealService } from "./meal.service";

const getAllMeal = async (req: Request, res: Response) => {
    try {
        const result = await mealService.getAllMeal();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Unsuccessful error in fetching data",
            details: error
        })
    }
}

const getMealById = async (req: Request, res: Response) => {
    try {
        const { mealId } = req.params;
        const result = await mealService.getMealById(mealId as string);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Unsuccessful error in meal item",
            details: error
        })
    }
}

export const mealController = {
    getAllMeal, getMealById,
}