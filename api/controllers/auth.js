import User from "../model/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

//Register
export const register = async (res,resp,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(res.body.password, salt);

        const newUser = new User({
            username:res.body.username,
            email:res.body.email,
            password: hash,
        })

        await newUser.save()
        resp.status(200).send("User has been created.")
    } catch (error) {
        next(error)
    }
}

//Login
export const login = async (res,resp,next) => {
    try {
        const user = await User.findOne({ username: res.body.username });
        if(!user) return next(createError(404, "User not found"));

        //Checking the password with the encrypted one in database
        const isPasswordCorrect = await bcrypt.compare(
          res.body.password,
          user.password
        );
        if (!isPasswordCorrect) 
            return next(createError(403, 'Wrong Password'));

            const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT);

        const { password, isAdmin, ...otherDetails } = user._doc;
        resp.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails});
    } catch (error) {
        next(error)
    }
}