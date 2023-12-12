import Hotel from "../model/Hotel.js"

//CREATE
export const createHotel = async (res, resp, next) => {
    const newHotel = new Hotel(res.body) 
    try {
        const savedHotel = await newHotel.save()
        resp.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}
//UPDATE
export const updateHotel = async (res, resp, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(res.params.id, { $set: res.body}, { new: true});
        resp.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}
//DELETE
export const deleteHotel = async (res, resp, next) => {
    try {
        await Hotel.findByIdAndDelete(res.params.id);
        resp.status(200).json("Hotel has been deleted.")
    } catch (error) {
        next(error)
    }
}
//GET
export const getHotel = async (res, resp, next) => {
    try {
        const hotel = await Hotel.findById(res.params.id);
        resp.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}
//GET ALL
export const getallHotel = async (res, resp, next) => {
    //const failed = true;
    
    //if(failed) return next(createError(401, "You are not authenticated!"))

    try {
        const hotels = await Hotel.find();
        resp.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}