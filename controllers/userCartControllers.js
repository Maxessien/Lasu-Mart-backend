import { User } from "../models/usersModel.js";
import { populateUserCart } from "../utils/usersUtilFns.js";

const addToCart = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.auth.uid });
    const existing = user.cart.find((item)=>item.productId===req.body.productId)
    const newCart = existing ? user.cart.map((item) => {
      if (item.productId === req.body.productId) {
        item.quantity += req.body.quantity;
      }
      return item;
    }) : [...user.cart, req.body];
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.auth.uid },
      { cart: newCart },
      { new: true }
    ).lean();
    console.log(updatedUser)
    const populatedCart = await populateUserCart(updatedUser.cart);
    return res.status(201).json({...updatedUser, cart: populatedCart});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    console.log(req.query)
    const user = await User.findOne({ userId: req.auth.uid }).lean();
    const newCart = user.cart.filter((item) => {
      return item.productId !== req.query.productId
    });
    console.log(newCart)
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.auth.uid },
      { cart: newCart },
      { new: true }
    ).lean();
    const populatedCart = await populateUserCart(updatedUser.cart);
    return res.status(201).json({ ...updatedUser, cart: populatedCart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export { addToCart, deleteFromCart };
