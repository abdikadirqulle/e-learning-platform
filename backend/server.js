import express,{json} from "express";
import cors from "cors";
import userRouter from "./router/user/user.js"



const server = express();
server.use(json());
server.use(cors());

server.use('/api/user', userRouter)
// server.use('/api/bookstore', bookStoreRouter)
// server.use('/api/author', authorRouter)
// server.use('/api/owner', ownerRouter)


server.get('/', (req, res) => {
    console.log("welcome to learnzone backend")
    res.status(200).json({message : "welcome to learnzone backend"})
})

export default server;