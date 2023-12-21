const BrandModel = require("../models/BrandModel");

const createBrand = async (data) => {
  const brand = await BrandModel.create(data);
  return brand;
};
const updateBrand = async (_id, data) => {
  const brand = await BrandModel.findOneAndUpdate(_id, data, { new: true });
  return brand;
};
const deleteBrand = async (id) => {
  const brand = await BrandModel.findByIdAndDelete(id);
  return brand;
};
const getAllBrands = async () => {
  const brands = await BrandModel.find();
  return brands;
}
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands
};