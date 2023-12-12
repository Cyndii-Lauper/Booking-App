import User from "../model/User.js"


//UPDATE
export const updateUser = async (res, resp, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(res.params.id, { $set: res.body}, { new: true});
        resp.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
//DELETE
export const deleteUser = async (res, resp, next) => {
    try {
        await User.findByIdAndDelete(res.params.id);
        resp.status(200).json("User has been deleted.")
    } catch (error) {
        next(error)
    }
}
//GET
export const getUser = async (res, resp, next) => {
    try {
        const user = await User.findById(res.params.id);
        resp.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
//GET ALL
export const getallUser = async (res, resp, next) => {
    //const failed = true;
    
    //if(failed) return next(createError(401, "You are not authenticated!"))

    try {
        const users = await User.find();
        resp.status(200).json(users)
    } catch (error) {
        next(error)
    }
}