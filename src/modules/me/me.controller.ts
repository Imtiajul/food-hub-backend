import { Request, Response } from "express";
import { meService } from "./me.service";

const getMyDetails = async (req: Request, res: Response) => {

    try {
        const userId = req.user?.id;
        const result = await meService.getMyDetails(userId as string);
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({
            error: "Sorry Fetch Faild. Try again.",
            details: error
        })
    }
}

export const meController = {
    getMyDetails,
}