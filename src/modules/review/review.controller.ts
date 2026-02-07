import { Request, Response } from "express";
import { reviewService } from "./review.service";

const addReview = async (req: Request, res: Response) => {
    try {
        const result = await reviewService.addReview(req.body, req.user?.id as string);
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Adding Review Failed",
            details: error
        })
    }
}

const getAllReviewByMealId = async(req: Request, res: Response) => {
        try {
        const {mealId} = req.params;
        console.log(mealId)
        const result = await reviewService.getAllReviewByMealId(mealId as string);
        res.status(201).json({ result });

    } catch (error: any) {
        res.status(400).json({
            error: "Fetching Review Failed",
            details: error
        })
    }
}

export const reviewController = {
    addReview, getAllReviewByMealId
}