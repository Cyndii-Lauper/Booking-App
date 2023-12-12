import Room from "../model/Room.js";
import Hotel from "../model/Hotel.js";
import { createError } from "../utils/error.js";


//CREATE
export const createRoom = async (res, resp, next) => {

    const hotelId = res.params.hotelid;
    const newRoom = new Room(res.body);

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id},
            });
        } catch (error) {
            next(error);
        }
        resp.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
};
//UPDATE
export const updateRoom = async (res, resp, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(res.params.id, { $set: res.body}, { new: true});
        resp.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}
//DELETE
export const deleteRoom = async (res, resp, next) => {
    const hotelId = res.params.hotelid;
    try {
        await Room.findByIdAndDelete(res.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: res.params.id},
            });
        } catch (error) {
            next(error);
        }
        resp.status(200).json("Room has been deleted.")
    } catch (error) {
        next(error)
    }
}
//GET
export const getRoom = async (res, resp, next) => {
    try {
        const room = await Room.findById(res.params.id);
        resp.status(200).json(room)
    } catch (error) {
        next(error)
    }
}
//GET ALL
export const getallRoom = async (res, resp, next) => {
    
    try {
        const rooms = await Room.find();
        resp.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}