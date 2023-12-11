import express from "express"
import Hotel from "../model/hotel.js";

const router = express.Router();

//CREATE
router.post("/", async (res,resp)=>{

    const newHotel = new Hotel(res.body) 
    try {
        const savedHotel = await newHotel.save()
        resp.status(200).json(savedHotel)
    } catch (error) {
        resp.status(500).json(error)
    }
})

export default router