import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetailsPage from "../pages/ProductsPage/ProductDetailsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export const routes = [
  {
    path: "/",
    element: HomePage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    element: SignInPage,
    isShowHeader: false,
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
    path: "*",
    element: NotFoundPage,
  },
];
