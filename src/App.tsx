import { Route, Routes } from "react-router-dom";
import Home from "./components/_root/pages/Home";
import Signin from "./components/_auth/Signin";
import Signup from "./components/_auth/Signup";
import Restaurants from "./components/_root/pages/Restaurants";
import FilterRoutes from "./components/custom/routes/FilterRoutes";
import Restaurant from "./components/_root/pages/Restaurant";
import HomeLayout from "./components/_root/layouts/HomeLayout";
import ActiveOrders from "./components/_root/pages/ActiveOrders";
import ProtectedRoutes from "./components/custom/routes/ProtectedRoutes";
import UserPrevsOrders from "./components/_root/pages/UserPrevsOrders";
import ClientLayout from "./components/_root/layouts/ClientLayout";
import UserProfileLayout from "./components/_root/layouts/UserProfileLayout";
import UserProfile from "./components/_root/pages/UserProfile";
import UserSecurity from "./components/_root/pages/UserSecurity";
import RestaurantProfileLayout from "./components/_root/layouts/RestaurantProfileLayout";
import RestaurantProfile from "./components/_root/pages/RestaurantProfile";
import RestaurantSecurity from "./components/_root/pages/RestaurantSecurity";
import RestaurantOwner from "./components/_root/pages/RestaurantOwner";

function App() {
  return (
    <Routes>
      <Route path="/">
        {/* Auth */}
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<FilterRoutes />}>
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="active-orders" element={<ActiveOrders />} />
            </Route>
          </Route>
          <Route path="restaurants">
            <Route index element={<Restaurants />} />
            <Route path=":restaurantName" element={<Restaurant />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<ClientLayout />}>
            <Route path="user">
              <Route element={<UserProfileLayout />}>
                <Route index element={<UserProfile />} />
                <Route path="security" element={<UserSecurity />} />
              </Route>
              <Route path="orders" element={<UserPrevsOrders />} />
            </Route>

            <Route path="my-restaurant">
              <Route element={<RestaurantProfileLayout />}>
                <Route index element={<RestaurantProfile />} />
                <Route path="security" element={<RestaurantSecurity />} />
                <Route path="owner" element={<RestaurantOwner />} />
              </Route>
              <Route path="orders" element={<UserPrevsOrders />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
