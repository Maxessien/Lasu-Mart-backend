import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"

const app = express()
app.use(cors({
    origin: true,
}))
app.use(express.json())

app.use("/user", userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT)
})