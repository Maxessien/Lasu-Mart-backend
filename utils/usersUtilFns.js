import fs from "fs"
import path from "path"
import multer from "multer";

export const upload = multer({ dest: "uploads" });

export const cleanUpStorage = ()=>{
    try {
        const relPath = path.join(__dirname, "uploads")
        fs.unlinkSync(relPath)
    } catch (err) {
        console.log(err)
        return err
    }
}