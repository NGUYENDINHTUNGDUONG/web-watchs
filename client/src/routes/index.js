import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProductDetailsPage from "../pages/ProductsPage/ProductDetailsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import MyOrderPage from "../pages/MyOder";
import PaymentPage from "../pages/PaymentPage";
import OrderSucess from "../pages/OrderSuccess";

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
  { path: "/payment", element: PaymentPage, isShowHeader: true },
  {
    path: "/my-order",
    element: MyOrderPage,
    isShowHeader: true,
  },
  { path: "/orderSuccess", element: OrderSucess, isShowHeader: true },
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
    path: "/products/:page",
    element: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    element: ProductsPage,
    isShowHeader: true,
  },

  {
    path: "/product-details/:id",
    element: ProductDetailsPage,
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
