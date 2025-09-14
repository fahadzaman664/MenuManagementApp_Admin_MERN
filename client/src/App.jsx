import { toast, Toaster } from "sonner";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./pages/sidebar-page";
import AddMenu from "./pages/AddMenu";
import Auth from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserInfoQuery } from "./features/user.slice";
import React from "react";
import { useEffect } from "react";
import { setUserInfo } from "./features/user.slice";
import { AdminProtectedRoutes } from "./components/AdminProtectedRoutes";
import MenuList from "./pages/MenuList";
import OrderList from "./pages/orderlist/OrderList";
import { AdminAndDriverProtectedRoutes } from "./components/ui/AdminAndDriverProtectedRoute";
import DriverOrders from "./pages/DriverOrders/DriverOrders";
import LogOut from "./components/LogOut";

function App() {
  const userData = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, refetch } = useGetUserInfoQuery();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      toast.error("Please login first");
      navigate("/auth");
      return;
    }
    const getuserData = async () => {
      try {
        const result = await refetch().unwrap();
        if (result.user && result.user._id) {
          dispatch(setUserInfo(result.user));
          setLoading(false);
        } else {
          dispatch(setUserInfo(null));
        }
      } catch (err) {
        dispatch(setUserInfo(null));
        // toast.error(err?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    if (!userData) {
      getuserData();
    } else {
      setLoading(false);
    }
  }, [userData]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster closeButton />
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route
          path="/addmenu"
          element={
            <AdminProtectedRoutes>
              <AddMenu />
            </AdminProtectedRoutes>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/menulist" element={<MenuList />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/logout" element={<LogOut />} />

        <Route
          path="/driverorders"
          element={
            <AdminAndDriverProtectedRoutes>
              <DriverOrders />
            </AdminAndDriverProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
