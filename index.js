import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./configs/mongoDBConfig.js";

dotenv.config();

const app = express()
app.use(cors({
    origin: true,
}))
app.use(express.json())

app.use("/user", userRoutes)

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
})