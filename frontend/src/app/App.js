import React from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import NotFound from "../pages/notfound";
import PrivateRoute from "../utils/PrivateRoute";

function PrivateContainer() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PrivateContainer />}>
          <Route path="" element={<Home />} />
          {/* <Route path="workspaces/:workspaceId" element={<Workspace />}>
            <Route path="" element={<PageNotExist />} />
            <Route path="pages/:pageId" element={<Page />} />
          </Route> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
