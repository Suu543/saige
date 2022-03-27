import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import History from "../../pages/user/History";
import LoadingToRedirect from "./LoadingToRedirect";
import Password from "../../pages/user/Password";
import Wishlist from "../../pages/user/Wishlist";

const UserRoute = ({ children, ...rest }) => {
  console.log("children", children);
  console.log("rest", rest);
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Routes>
      <Route path="history" element={<History />} />
      <Route path="password" element={<Password />} />
      <Route path="wishlist" element={<Wishlist />} />
    </Routes>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
