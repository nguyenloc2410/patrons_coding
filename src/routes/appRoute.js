import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login/login";
import Register from "../components/register/register";
import Main from "../components/main/main";
import Project from "../components/project/project";
import PrivateRoute from "./privateRoute";
import WelcomePage from "../components/welcomepage/welcomepage";
const appRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/main/*"
          element={<PrivateRoute path="/" element={<Main></Main>} />}
        />
        <Route
          path="/project"
          element={<PrivateRoute path="/" element={<Project></Project>} />}
        />
        {/* public route */}
        <Route path="/" exact element={<WelcomePage></WelcomePage>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="*" element={"404 NOT FOUND"}></Route>
      </Routes>
    </>
  );
};
export default appRoutes;
