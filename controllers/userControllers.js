import { findError } from "../fbAuthErrors.js";
import { auth } from "../configs/fbConfigs.js";
import { User } from "../models/usersModel.js";
import { uploader } from "../configs/cloudinaryConfigs.js";
import { cleanUpStorage } from "../utils/usersUtilFns.js";

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await auth.createUser(req.body);
    const dbStore = await User.create({
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
    });
    console.log(dbStore);
    return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    const errorMessage = findError(err.code);
    console.log(errorMessage);
    return res.status(errorMessage?.statusCode || 500).json({
      message: errorMessage?.customMessage || "Server error, try again later",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.auth);
    const user = await auth.updateUser(req.auth);
    const dbStore = await User.findOneAndUpdate(
      { userId: req.auth.uid },
      req.body,
      { new: true }
    ).lean();
    console.log(dbStore);
    return res.status(201).json({ dbStore });
  } catch (err) {
    const errorMessage = findError(err.code);
    console.log(errorMessage);
    return res.status(errorMessage?.statusCode || 500).json({
      message: errorMessage?.customMessage || "Server error, try again later",
    });
  }
};

const uploadUserProfilePhoto = (type="upload")=> async (req, res) => {
  console.log("Visited upload");
  try {
    if (type==="update"){
      const profilePhotoDb = await User.findOne({userId: req.auth.uid}).select("profilePicture")
    }
    const uploadedImage = await uploader.upload(req.file.path, {
      folder: profilePhotoDb?.publicId || "lasu_mart/user_profile_photos",
    });
    const storedInDb = await User.findOneAndUpdate(
      { userId: req.auth.uid },
      {
        profilePicture: {
          url: uploadedImage.secure_url,
          publicId: uploadedImage.public_id,
        },
      }, {new: true}
    );
    cleanUpStorage()
    console.log(storedInDb);
    return res.status(201).json(storedInDb);
  } catch (err) {
    console.log(err);
    const errorMessage = null;
    // console.log(errorMessage);
    return res.status(errorMessage?.statusCode || 500).json({
      message: errorMessage?.customMessage || "Server error, try again later",
    });
  }
};

const deleteUserProfilePhoto = async(req, res)=>{
  try {
      const profilePhotoDb = await User.findOne({userId: req.auth.uid}).select("profilePicture")
    await uploader.destroy(profilePhotoDb.publicId)
    const updatedUserDb = await User.findOneAndUpdate({userId: req.auth.uid}, {
      profilePhoto: {
        url: "default",
        publicId: "default_public_id"
      }
    }, {new: true})
    res.status(201).json(updatedUserDb)
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: "Failed to delete image, try again later"})
  }
}

export { createUser, updateUser, uploadUserProfilePhoto, deleteUserProfilePhoto };
