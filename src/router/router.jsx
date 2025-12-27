import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/homeLayout/HomeLayout";
import AuthLayout from "../layout/authLayout/AuthLayout";
import Error from "../pages/error/Error";
import Login from "../layout/authLayout/login/Login";
import Register from "../layout/authLayout/register/Register";
import Private from "../routes/Private";
import Profile from "../pages/profile/Profile";
import ProfileSettings from "../pages/profileSettings/ProfileSettings";
import ForgotPassword from "../layout/authLayout/ForgotPassword/ForgotPassword";
import Shop from "../pages/Shop/Shop";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/dashboard/Users/Users";
import ManageCategory from "../pages/dashboard/Category/ManageCategory";
import MyMedicine from "../pages/dashboard/seller/MyMedicine";
import Company from "../pages/dashboard/company/Company";
import Home from "../pages/home/home/Home";
import CategoryMedicine from "../pages/categoryMedicine/CategoryMedicine";
import Cart from "../pages/dashboard/cart/Cart";
import Invoice from "../pages/dashboard/cart/Invoice";
import Payments from "../pages/dashboard/Payments/Payments";
import SalesReport from "../pages/dashboard/Payments/SalesReport";
import Revenue from "../pages/dashboard/seller/Revenue";
import BannerAproval from "../pages/dashboard/BannerAproval/BannerAproval";
import ProductPage from "../pages/home/DiscountProducts/ProductPage";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import Locations from "../components/locations/Locations";
import SalesChart from "../pages/dashboard/salesChart/SalesChart";
import DoctorAppointment from "../components/doctorAppointment/DoctorAppointment";
import About from "../pages/about/About";



export const router = createBrowserRouter([
  {
    index: "/",
    Component: HomeLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "categoryMedicine/:categoryName",
        element: <CategoryMedicine />
      },
      {
        path: "shop",
        Component: Shop,
      },
      {
        path: "branch",
        Component: Locations
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/doctors",
        element: <DoctorAppointment/>,
      },
      {
        path: "/about",
        Component: About
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot",
        Component: ForgotPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
    children: [
      {
        index: "/",
        element: <SalesChart />,
      },
      {
        path: "overview",
        element: <SalesChart/>
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <ProfileSettings />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "invoice/:transactionId",
        element: <Invoice />,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory
      },
      // Admin
      {
        path: "users",
        Component: Users,
      },
      {
        path: "manageCategory",
        Component: ManageCategory,
      },
      {
        path: "company",
        Component: Company,
      },
      {
        path: "payments",
        Component: Payments,
      },
      {
        path: "salesReport",
        Component: SalesReport,
      },
      {
        path: "bannerAproval",
        Component: BannerAproval,
      },
      // Admin
      // Seller
      {
        path: "myMedicine",
        Component: MyMedicine,
      },
      {
        path: "revenue",
        Component: Revenue,
      },
      {
        path: "history",
        Component: Revenue,
      },
    ],
  },
]);

