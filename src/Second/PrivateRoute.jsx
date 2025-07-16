import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../Store/userAtom";

const PrivateRoute = () => {
  const user = useRecoilValue(userAtom);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const isAuthenticated = user?.userId || localUser?.userId;

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
