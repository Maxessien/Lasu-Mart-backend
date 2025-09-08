import { auth } from "../configs/fbConfigs.js"

const userAuthMiddleware = async(req, res, next)=>{
    const token = req.header.split("Bearer ")[1] || ""
    try {
        const decodedToken = await auth.verifyIdToken(token)
        req.user = decodedToken
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({message:"Unauthorised access"})
    }
}


export {userAuthMiddleware}