import express, { Router } from "express";
import {loginUser, registerUser } from "../../controller/user/userController.js";
import { connectDB, prisma } from "../../config/db.js";
import { Authoriza } from "../../middleware/middleware.js";
const userRouter = express.Router();

userRouter.get('/', async (req , res) => {
    await connectDB;
    const users = await prisma.user.findMany()

    res.status(200).json({ users});

})

userRouter.post('/register-user', registerUser);
userRouter.post('/login-user', loginUser);
userRouter.get('/current-user', Authoriza, (req, res) => {
    res.json(req.user);
  });

export default userRouter;




