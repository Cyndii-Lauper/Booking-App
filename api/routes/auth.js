import express from "express"

const router = express.Router();

router.get("/", (res,resp)=>{
    resp.send("Hello World, This is auth endpoint!")
})

export default router