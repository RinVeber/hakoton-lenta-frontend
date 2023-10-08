import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { FC } from "react";

interface IPropProtected {
  component: React.ElementType;
}

const ProtectedRoute: FC<IPropProtected> = ({
  component: Component,
  ...props
}) => {
  const token = localStorage.getItem("jwt");
  if (!Component) return null;
  console.log(token);

  return token ? <Component {...props} /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
