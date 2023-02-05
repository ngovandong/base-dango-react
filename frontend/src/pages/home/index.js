import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrentWorkspace } from "../../app/store/authSlice";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentWorkspace = useSelector(selectCurrentWorkspace);
  useEffect(() => {
    if (currentWorkspace) {
      navigate(`workspaces/${currentWorkspace}`);
    }
  }, []);

  return (
    <div className="home-page">
      <div className="header-container">
        <div className="left">
          <h1>Hi, Dong Ngo</h1>
          <p>Open or create a course</p>
          <div className="search">
            <input
              className="search_input"
              placeholder="Search your course here"
            />
            <div className="search_icon"></div>
          </div>
        </div>
        <div className="right">
          <div className="add-workspace-btn">
            <span>Add Course</span>
          </div>
        </div>
      </div>
      <div className="myworkspace">
        <p className="title">My Course</p>
        <div className="workspace-container"></div>
      </div>
      <button color="inherit" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
}

export default Home;
