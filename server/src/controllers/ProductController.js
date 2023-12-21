const fs = require("fs");
const path = require("path");

const ProductRepo = require("../repository/ProductRepo");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductRepo.getAllProducts({});
    return res.status(200).json({ message: "All Products", data: products });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const getAllTypes = async (req, res, next) => {
  try {
    const types = await ProductRepo.getAllTypes();
    res.status(200).json({ types });
  } catch (error) {
    next(error);
  }
};
const getAllCalibers = async (req, res, next) => {
  try {
    const calibers = await ProductRepo.getAllCalibers();
    res.status(200).json({ calibers });
  } catch (error) {
    next(error);
  }
};
const getAllBrands = async (req, res, next) => {
  try {
    const brands = await ProductRepo.getAllBrands();
    res.status(200).json({ brands });
  } catch (error) {
    next(error);
  }
};
const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await ProductRepo.findProduct({ _id: productId });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product found", data: product });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const findProductByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    const product = await ProductRepo.findProductByName(name);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product found", data: product });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const findProductByFilter = async (req, res, next) => {
  try {
    const {
      type,
      glass,
      brand,
      category,
      caliber,
      minPrice,
      maxPrice,
      minRating,
    } = req.query;
    const filter = {
      ...(type && { type }),
      ...(glass && { glass }),
      ...(brand && { brand }),
      ...(category && { category }),
      ...(caliber && { caliber }),
      ...(minPrice && {
        price: {
          $gte: minPrice,
        },
      }),
      ...(maxPrice && {
        price: {
          $lte: maxPrice,
        },
      }),
      ...(minRating && { rating: { $gte: minRating } }),
    };
    console.log(req.query);
    const product = await ProductRepo.getAllProducts(filter);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product found", data: product });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const createProduct = async (req, res, next) => {
  try {
    const images = req.files.map((file) => file.filename);
    const product = await ProductRepo.createProduct({
      images,
      ...req.body,
    });
    return res.status(200).json({ message: "Product created", data: product });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await ProductRepo.findProduct({ _id: productId });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (req.body.images) {
      const oldImages = product.images;
      const newImages = req.body.images;
      const deleteImages = oldImages.filter(
        (image) => !newImages.includes(image)
      );
      deleteImages.forEach((image) => {
        fs.unlink(path.join(__dirname, "../uploads", image), (err) => {
          console.log(err);
        });
      });
    }
    const updateProduct = await ProductRepo.updateProduct({
      productId,
      update: {
        ...req.body,
      },
    });
    console.log("test: " + req.body.images);
    return res
      .status(200)
      .json({ message: "Product updated", data: updateProduct });
  } catch (error) {
    next(error);
    console.log("test: " + error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await ProductRepo.findProduct({ _id: productId });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    const deleteProduct = await ProductRepo.deleteProduct({
      _id: productId,
    });

    return res
      .status(200)
      .json({ message: "Product deleted", data: deleteProduct });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const createReview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await ProductRepo.findProduct({ _id: productId });
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (product.reviews.find((review) => review.userId === req.payload.id)) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = await ProductRepo.createReview({
      productId,
      userId: req.payload.id,
      fullName: req.payload.fullName,
      ...req.body,
    });
    return res.status(200).json({ message: "Review created", data: review });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
module.exports = {
  getProduct,
  getAllProducts,
  findProductByName,
  findProductByFilter,
  createProduct,
  createReview,
  getAllBrands,
  updateProduct,
  deleteProduct,
  getAllTypes,
  getAllCalibers,
};
