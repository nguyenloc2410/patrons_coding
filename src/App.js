import "./App.scss";
import Nav from "./components/navigation/nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoute";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Vortex } from "react-loader-spinner";
import { UserContext } from "./context/userProvider";
import _ from "lodash";
function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        {user && user.isLoading && window.location.pathname !== "/" ? (
          <div className="loadingTheme">
            <Vortex
              visible={true}
              height="300"
              width="300"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
            <div>Loading ...</div>
          </div>
        ) : (
          <>
            <div className="app_header">
              <Nav></Nav>
            </div>
            <div className="app_container">
              <AppRoutes></AppRoutes>
            </div>
          </>
        )}
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
    </>
  );
}

export default App;
