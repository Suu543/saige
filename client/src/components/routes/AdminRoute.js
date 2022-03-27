import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
import AdminDashboard from "../../pages/admin/AdminDashboard";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user && user.token) {
        try {
          const admin = await currentAdmin(user.token);
          console.log("CURRENT ADMIN RES", admin);
          setOk(true);
        } catch (error) {
          console.log("ADMIN ROUTE ERR", error);
          setOk(false);
        }
      }
    };

    checkAdmin();
  }, [user]);

  return ok ? (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
