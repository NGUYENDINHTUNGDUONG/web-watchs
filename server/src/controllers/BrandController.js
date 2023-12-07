const BrandRepo = require("../repository/BrandRepo");

const createBrand = async (req, res, next) => {
  try {
    const brand = await BrandRepo.createBrand({
      ...req.body,
      image: req.file?.filename,
    });
    res.status(200).json(brand);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateBrand = async (req, res, next) => {
  try {
    const brand = await BrandRepo.updateBrand(req.params._id, { ...req.body });
    res.status(200).json(brand);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteBrand = async (req, res, next) => {
  try {
    const brand = await BrandRepo.deleteBrand(req.params.id);
    res.status(200).json(brand);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandRepo.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands
};