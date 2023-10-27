import { React, useState, createContext, useEffect } from "react";
import { accountRefesh } from "../services/userService";
import Cookies from "universal-cookie";

const UserContext = createContext({
  isAuthentic: false,
  token: "fake token",
  account: {},
});
const UserProvider = ({ children }) => {
  const cookies = new Cookies();
  const defaultData = {
    isLoading: true,
    isAuthentic: false,
    token: "",
    account: {},
  };
  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      refeshAccount();
    } else {
      setUser({ ...defaultData, isLoading: false });
    }
  }, []);

  const [user, setUser] = useState(defaultData);

  const refeshAccount = async () => {
    console.log(window.location.pathname);
    console.log("REFESH");
    let data = await accountRefesh();
    if (data.EC === 0) {
      const usertmp = {
        isLoading: false,
        isAuthentic: true,
        token: data.DT.access_token,
        account: data.DT.user,
      };
      setTimeout(() => {
        setUser(usertmp);
      }, 300);
    } else {
      setUser({ ...defaultData, isLoading: false });
    }
  };

  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
    cookies.set("jwt", userData.token);
  };

  const logoutContext = () => {
    setUser({ ...defaultData, isLoading: false });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
