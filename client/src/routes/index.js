import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProductDetailsPage from "../pages/ProductsPage/ProductDetailsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import AdminPage from "../pages/AdminPage/AdminPage";

export const routes = [
  {
    path: "/",
    element: HomePage,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    element: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/order",
    element: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    element: ProductsPage,
    isShowHeader: true,
  },

  {
    path: "/product-details/",
    element: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/type",
    element: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/admin",
    element: AdminPage,
    isShowHeader: false,
    isPrivated: true,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];
