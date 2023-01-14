import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user?.data?._id) {
    return children;
  } else return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
