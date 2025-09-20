import { findError } from "../fbAuthErrors.js";
import { auth } from "../configs/fbConfigs.js";
import { User } from "../models/usersModel.js";
import { uploader } from "../configs/cloudinaryConfigs.js";
import { cleanUpStorage } from "../utils/usersUtilFns.js";

const createUser = async (req, res) => {
  try {
    const user = await auth.createUser(req.body);
    await auth.setCustomUserClaims(user.uid, {role: "user"})
    console.log(user, "user")
    const dbStore = await User.create({
      userId: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
    });
    console.log(dbStore);
    return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.log(err)
    const errorMessage = findError(err.code);
    console.log(errorMessage);
    return res.status(errorMessage?.statusCode || 500).json({
      message: errorMessage?.customMessage || "Server error, try again later",
    });
  }
};

const getUser = async (req, res)=>{
  try {
    const uid = req.param.uid
    const user = await User.findOne({userId: uid}).lean()
    console.log(user)
    return res.status(202).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({message: "User not found"})
  }
}

const updateUser = async (req, res) => {
  try {
    console.log(req.auth);
    const user = await auth.updateUser(req.auth.uid, req.body);
    const dbStore = await User.findOneAndUpdate(
      { userId: req.auth.uid },
      req.body,
      { new: true }
    ).lean();
    console.log(dbStore);
    return res.status(201).json(dbStore);
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
    let profilePhotoDb
    if (type==="update"){
      profilePhotoDb = await User.findOne({userId: req.auth.uid}).select("profilePicture")
    }
    const uploadedImage = await uploader.upload(req.file.path, {
      folder: profilePhotoDb?.profilePicture.publicId || "lasu_mart/user_profile_photos",
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
    const errorMessage = findError(err.code);
    console.log(errorMessage);
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
      profilePicture: {
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

export { createUser, updateUser, uploadUserProfilePhoto, deleteUserProfilePhoto, getUser };
