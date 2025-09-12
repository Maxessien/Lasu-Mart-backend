import { model, Schema } from "mongoose";

const vendorSchema = new Schema({
  vendorId: { type: String, required: true, unique: true },
  listedProducts: { type: [String], required: true },
  followers: { type: [String], required: true, default: [] },
  contactInfo: {
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
  },
  VendorReviews: { type: [String], required: true, default: [] },
  storeName: { type: String, required: true },
  storeLogoUrl: { type: String, required: true, default: "defaultStoreLogo" },
}, {timeStamp: true});

export const Vendor = model("Vendor", vendorSchema);
