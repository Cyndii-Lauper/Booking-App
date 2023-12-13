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
};
//UPDATE
export const updateHotel = async (res, resp, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(res.params.id, { $set: res.body}, { new: true});
        resp.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
};
//DELETE
export const deleteHotel = async (res, resp, next) => {
    try {
        await Hotel.findByIdAndDelete(res.params.id);
        resp.status(200).json("Hotel has been deleted.")
    } catch (error) {
        next(error)
    }
};
//GET
export const getHotel = async (res, resp, next) => {
    try {
        const hotel = await Hotel.findById(res.params.id);
        resp.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
};
//GET ALL
export const getallHotel = async (res, resp, next) => {
    try {
        const {limit, min, max, ...others }=res.query;
        const hotels = await Hotel.find({
          ...others,
          cheapestPrice: { $gt: min | 1, $lt: max || 999 },
        }).limit(limit);
        resp.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
};

export const countByCity = async (res, resp, next) => {
    const cities = res.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      resp.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  export const countByType = async (res, resp, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      resp.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };