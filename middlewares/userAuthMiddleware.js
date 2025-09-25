import { auth } from "../configs/fbConfigs.js";

const userAuthMiddleware = async (req, res, next) => {
  console.log(req.headers)
    const authHeader = req.headers.Authorization || req.headers.authorization
    console.log(authHeader, "auth")
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader?.split("Bearer ")[1] || ""
      : null;
    if (!token) throw new Error("Unauthorised access");
    try {
      const decodedToken = await auth.verifyIdToken(token);
      console.log(decodedToken);
      if ("user" != decodedToken.role || !decodedToken) {
        throw new Error("Unauthorised access");
      } else {
        req.auth = decodedToken;
        next();
      }
    } catch (err) {
      console.log(err, "error");
      res.status(400).json({ message: "Unauthorised access" });
    }
  };
export { userAuthMiddleware };
