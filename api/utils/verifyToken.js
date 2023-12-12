import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (res, resp, next) => {
  const token = res.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    res.user = user;
    next();
  });
};

export const verifyUser = (res, resp, next) => {
    // If the user is already verified go to the next middleware function
    verifyToken(res,resp, () => {
        if(res.user.id === res.params.id || res.user.isAdmin){
            next();
        } else {
            if (err) return next(createError(403, "You are not authorized"));
        }
    })
};