import express from "express"
import Hotel from "../model/Hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getallHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getallHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router