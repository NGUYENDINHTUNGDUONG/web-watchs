const BrandModel = require("../models/BrandModel");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");

const getStartDateOfMonth = (ago) => {
  const a = new Date();
  const year = a.getUTCFullYear();
  const month = a.getUTCMonth();
  const startMonth = new Date(Date.UTC(year, month - ago, 1));
  return startMonth;
};

const getStatistic = async (req, res, next) => {
  try {
    const statistic = [];
    for (let i = 0; i < 12; i++) {
      endDate = i == 0 ? new Date() : getStartDateOfMonth(i - 1);
      startDate = getStartDateOfMonth(i);
      const orders = await OrderModel.find({
        createdAt: { $gte: startDate, $lte: endDate },
      }).populate("orderItem.product");
      const productSales = {};
      const brandSales = {};
      let maleSales = 0;
      let femaleSales = 0;
      let revenue = 0;
      orders.forEach((order) => {
        revenue += order.totalPrice;
        order.orderItem.forEach((item) => {
          const productId = item.product._id;
          const brand = item.product.brand;
          const category = item.product.category;
          if (productSales[productId]) {
            productSales[productId] += item.amount;
          } else {
            productSales[productId] = item.amount;
          }

          if (brandSales[brand]) {
            brandSales[brand] += item.amount;
          } else {
            brandSales[brand] = item.amount;
          }

          if (category == "Nam") {
            maleSales += item.amount;
          } else femaleSales += item.amount;
        });
      });
      const productIds = Object.keys(productSales);

      let products = await ProductModel.find({
        _id: { $in: productIds },
      }).lean();

      products = products.map((product) => ({
        ...product,
        soldMonth: productSales[product._id],
      }));
      products.sort((a, b) => {
        return b.soldMonth - a.soldMonth;
      });

      const brandIds = Object.keys(brandSales);
      let brands = await BrandModel.find({ _id: { $in: brandIds } }).lean();

      brands = brands.map((brand) => ({
        ...brand,
        soldMonth: brandSales[brand._id],
      }));
      brands.sort((a, b) => {
        return b.soldMonth - a.soldMonth;
      });

      statistic[i] = {
        month: getStartDateOfMonth(i).getUTCMonth() + 1,
        revenue,
        products,
        brands,
        maleSales,
        femaleSales,
      };
    }

    res.status(200).json({
      statistic,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getStatistic,
}