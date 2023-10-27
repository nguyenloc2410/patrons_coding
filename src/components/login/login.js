import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "../login/login.scss";
import { loginUser } from "../../services/userService";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userProvider";
const Login = () => {
  const { loginContext } = useContext(UserContext);
  const { user } = useContext(UserContext);
  let navigates = useNavigate();
  const handleRegister = () => {
    navigates("/register");
  };
  useEffect(() => {
    if (user.isAuthentic) {
      navigates("/");
    }
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const defaultValidateInput = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [validate_input, setValidate_input] = useState(defaultValidateInput);
  //Validate User
  const validate = () => {
    setValidate_input(defaultValidateInput);
    if (!email) {
      setValidate_input({ ...defaultValidateInput, isValidEmail: false });
      return false;
    }
    if (!password) {
      setValidate_input({ ...defaultValidateInput, isValidPassword: false });
      return false;
    }
    return true;
  };

  //Login
  const LoginAccount = async () => {
    let checkvalid = validate();
    if (checkvalid) {
      let serverdata = await loginUser(email, password);
      if (serverdata.EC === 0) {
        toast.success(serverdata.EM);
        let roles = serverdata.DT.roles;
        let email = serverdata.DT.email;
        let username = serverdata.DT.username;
        let accesstoken = serverdata.DT.access_token;
        let data = {
          isAuthentic: true,
          token: accesstoken,
          account: { roles, email, username },
        };
        localStorage.setItem("jwt", accesstoken);
        loginContext(data);
        navigates("/main");
        // window.location.reload();
      } else {
        toast.warning(serverdata.EM);
      }
    }
  };
  return (
    <>
      <div className="login_container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="col-1"></div>
            <div className="login_left col-12 d-none col-sm-5 d-sm-block ">
              <div className="brand">Dien Tu Di Code</div>
              <div className="detail">Learning everything</div>
            </div>
            <div className="login_right col-sm-5 col-12">
              <div className="brand d-sm-none">Dien Tu Di Code</div>
              <div className="login_content p-3 p-sm-4">
                <form
                  className="d-grid gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    placeholder="Enter email address"
                    className={
                      validate_input.isValidEmail
                        ? "form-control form-control-lg"
                        : "form-control form-control-lg is-invalid"
                    }
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                  ></input>
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    Please enter a email.
                  </div>
                  <div>
                    <input
                      placeholder="Password"
                      className={
                        validate_input.isValidPassword
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg is-invalid"
                      }
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                    ></input>
                    <div
                      id="validationServerPasswordFeedback"
                      className="invalid-feedback"
                    >
                      Please enter a password.
                    </div>
                  </div>
                  <button
                    className="btn btn-primary col-12 btn-lg"
                    onClick={() => LoginAccount()}
                  >
                    Log in
                  </button>
                  <div className="action_contain d-flex flex-column align-items-center">
                    <span>
                      <Link className="forget_pass" to="/">
                        Forgotten password?
                      </Link>
                    </span>
                    <hr className="col-12" />
                    <button
                      className="btn green col-8 col-sm-6 "
                      onClick={() => handleRegister()}
                    >
                      Create new account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
