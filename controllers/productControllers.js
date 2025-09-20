import { Product } from "../models/productsModel.js";

const getProducts = async (req, res) => {
  try {
    console.log({ ...req.body }, "fffff");
    const { page, limit, sortInfo, priceRange } = req.body;
    const products = await Product.find({
      price: { $gte: priceRange.min, $lte: priceRange.max },
    })
      .limit(20)
      .skip(page - 1)
      .sort([[sortInfo.type, sortInfo.order]])
      .lean();
    const count = await Product.countDocuments()
    console.log(count)
    // console.log(products);
    return res.status(202).json({data: products, totalPages: Math.floor(count/40)});
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getTrendingProducts = async (req, res) => {
  try {
    const trendingProducts = await Product.find()
      .sort([["ratings", "desc"]])
      .limit(6)
      .lean();
    console.log(trendingProducts, "trdprod");
    return res.status(202).json(trendingProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export { getProducts, getTrendingProducts };
