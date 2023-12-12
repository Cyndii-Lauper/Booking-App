import express from "express"
import { deleteUser, getUser, getallUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// //CHECK
// router.get("/check", verifyToken, (res, resp, next) => {
//     resp.send("hello user, you are logged in")
//     //if (!req.tokenData) return res.status(401).send({ auth: false, message: 'No token provided'
// })

// //CHECK USER
// router.get("/check-user/:id", verifyUser, (res, resp, next) => {
//     resp.send("hello user, you are logged in and you can delete your account")
// })

// //CHECK ADMIN
// router.get("/check-admin/:id", verifyAdmin, (res, resp, next) => {
//     resp.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getallUser);

export default router