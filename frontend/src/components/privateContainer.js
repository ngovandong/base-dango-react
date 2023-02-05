import { Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function PrivateContainer() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}
