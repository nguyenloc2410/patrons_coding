import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userProvider";
const PrivateRoute = (props) => {
  let navigates = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user || user.isAuthentic === false) {
      navigates("/login");
    }
  });
  return (
    <>
      <Routes>
        <Route path={props.path} element={props.element}></Route>
      </Routes>
    </>
  );
};
export default PrivateRoute;
