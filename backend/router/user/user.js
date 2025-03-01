import express, { Router } from "express"
import {
  deleteUser,
  loginUser,
  registerUser,
  signout,
} from "../../controller/user/userController.js"
import { connectDB, prisma } from "../../config/db.js"
import { Authoriza } from "../../middleware/middleware.js"
const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany()

  await connectDB
  res.status(200).json({ users })
})

userRouter.post("/register-user", registerUser)
userRouter.post("/login-user", loginUser)
userRouter.get("/signout", signout)
userRouter.delete("/deleteUser/:id", deleteUser)
userRouter.get("/current-user", Authoriza, (req, res) => {
  res.json(req.user)
})

export default userRouter
