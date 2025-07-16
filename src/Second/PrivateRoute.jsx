
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../Store/userAtom";

const PrivateRoute = () => {
  const user = useRecoilValue(userAtom);

  return user?.userId ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
