import { Request, Response } from "express";
import { mealService } from "./meal.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";

const getAllMeal = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        // console.log(search);
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true'
                ? true :
                req.query.isFeatured === "false"
                    ? false : undefined
            : undefined;
        const isAvailable = req.query.isAvailable
            ? req.query.isAvailable === 'true'
                ? true :
                req.query.isAvailable === "false"
                    ? false : undefined
            : undefined;
        const categoryId = req.query.categoryId as string | undefined;

        const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);
        const searchString = typeof search === "string" ? search : undefined;

        const result = await mealService.getAllMeal({search: searchString, categoryId, isAvailable, isFeatured, page, limit, skip, sortBy, sortOrder});

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