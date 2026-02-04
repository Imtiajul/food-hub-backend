import { Request, Response } from "express"
import { adminService } from "./admin.service"

const getAllUser = async(req:Request, res: Response) => {
    try {
        console.log(req.user)

        const result = await adminService.getAllUser();
        res.status(200).json({result})
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Unsuccessful error in meal item",
            details: error
        })
    }
}

export const adminController = {
    getAllUser,
}