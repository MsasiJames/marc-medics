import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  
  return token ? element : <Navigate to="/admin" />;
};

export default PrivateRoute;
