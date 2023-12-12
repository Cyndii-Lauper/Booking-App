import express from "express"
import { deleteUser, getUser, getallUser, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CHECK
router.get("/check", verifyToken, (res, resp, next) => {
    resp.send("hello user, you are logged in")
    //if (!req.tokenData) return res.status(401).send({ auth: false, message: 'No token provided'
})

//CHECK USER
router.get("/check-user/:id", verifyUser, (res, resp, next) => {
    resp.send("hello user, you are logged in and you can delete your account")
})

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getallUser);

export default router