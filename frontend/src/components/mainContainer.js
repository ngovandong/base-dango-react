import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import PrivateRoute from "./privateRoute";

export default function MainContainer() {
  return (
    <PrivateRoute>
      <NavBar/>
      <Outlet />
    </PrivateRoute>
  );
}
