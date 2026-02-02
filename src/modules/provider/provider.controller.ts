import { Response, Request } from "express";
import { providerService } from "./provider.service";


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


export const providerController = {
    createMeal, addProvider
}
