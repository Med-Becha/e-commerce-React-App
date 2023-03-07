import { BrowserRouter, Routes, Route } from "react-router-dom";

// components:
import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";

//user components:
import RoutesWithUserChatComponent from "./Components/User/RoutesWithUserChatComponent";

// publicly available pages:
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Apropos from "./pages/Apropos";

import ProtectedRoutesComponent from "./Components/ProtectedRoutesComponents";

// protected user pages:
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrderPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";

// protected admin pages:
import AdminUsersPage from "./pages/Admin/AdminUsersPage";
import AdminEditUserPage from "./pages/Admin/AdminEditUserPage";
import AdminProductsPage from "./pages/Admin/AdminProductsPage";
import AdminCreateProductPage from "./pages/Admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/Admin/AdminEditProductPage";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/Admin/AdminOrderDetailsPage";
import AdminChatsPage from "./pages/Admin/AdminChatsPage";
import AdminAnalyticsPage from "./pages/Admin/AdminAnalyticsPage";
import ScrollToTop from "./utils/ScrollToTop";

import { ToastContainer,  } from 'react-toastify';



function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <HeaderComponent />
      <Routes>
      <Route element={<RoutesWithUserChatComponent />}>
          {/* publicly available routes: */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-list/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-list/search/:searchQuery" element={<ProductListPage />} />
          <Route path="/product-list/search/:searchQuery/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/search/:searchQuery" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/search/:searchQuery/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element="Page not exists 404" />
          <Route path="/apropos" element={<Apropos/>}/>
        </Route>
        {/* <Route path="/" component={HomePage} />  in previous versions of react-router-dom */}

        {/* user protected routes: */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/my-orders" element={<UserOrdersPage />} />
          <Route path="/user/cart-details" element={<UserCartDetailsPage />} />
          <Route
            path="/user/order-details/:id"
            element={<UserOrderDetailsPage />}
          />
        </Route>

        {/* admin protected routes: */}
        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user/:id" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product/:id"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailsPage />}
          />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
      <FooterComponent />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

