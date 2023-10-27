import { useState } from "react";
import "../register/register.scss";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigates = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const defaultValidateInput = {
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmpassword: true,
    isValidPhone: true,
    isValidAddress: true,
  };
  const [validate_input, setValidate_input] = useState(defaultValidateInput);
  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/v1/test/api").then((data) => {
  //     console.log(">>check data : ", data);
  //   });
  // });
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
    if (!confirmpassword) {
      setValidate_input({
        ...defaultValidateInput,
        isValidConfirmpassword: false,
      });
      return false;
    }
    if (!phone) {
      setValidate_input({
        ...defaultValidateInput,
        isValidPhone: false,
      });
      return false;
    }
    if (!address) {
      setValidate_input({ ...defaultValidateInput, isValidAddress: false });
      return false;
    }
    if (password !== confirmpassword) {
      setValidate_input({
        ...defaultValidateInput,
        isValidConfirmpassword: false,
      });
      return false;
    }
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    if (!validateEmailRegex.test(email)) {
      setValidate_input({ ...defaultValidateInput, isValidEmail: false });
      return false;
    }

    return true;
  };
  const register = async () => {
    let check = validate();
    if (check) {
      let nofy = await registerNewUser(email, phone, password, gender, address);
      let serverdata = nofy;
      if (+serverdata.EC === 0) {
        toast.success(serverdata.EM);
        navigates("/login");
      } else {
        toast.warning(serverdata.EM);
      }
    }
  };
  return (
    <>
      <div className="register_container">
        <div className="container">
          <div className="row form_register">
            <div className="content_left col-sm-3"></div>
            <div className="content_main col-12 col-sm-6 d-flex justify-content-center">
              <div className="main_form d-grid gap-3 p-3 mt-5">
                <h1 className="title">Register</h1>
                <form
                  className="d-grid gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="inputemail">
                    <label htmlFor="inputemail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className={
                        validate_input.isValidEmail
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg is-invalid"
                      }
                      id="inputemail"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    ></input>
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      Please enter a email.
                    </div>
                  </div>
                  <div className="inputpassword">
                    <label htmlFor="inputpassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className={
                        validate_input.isValidPassword
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg is-invalid"
                      }
                      id="inputpassword"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      Please enter a password.
                    </div>
                  </div>
                  <div className="inputconfirmpassword">
                    <label
                      htmlFor="inputconfirmpassword"
                      className="form-label"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter confirm password"
                      className={
                        validate_input.isValidConfirmpassword
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg is-invalid"
                      }
                      id="inputconfirmpassword"
                      value={confirmpassword}
                      onChange={(event) =>
                        setconfirmpassword(event.target.value)
                      }
                    ></input>
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      Please enter a confirm password.
                    </div>
                  </div>
                  <div className="inputphone">
                    <label htmlFor="inputphone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className={
                        validate_input.isValidPhone
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg is-invalid"
                      }
                      id="inputphone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    ></input>
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      Please enter a phone number.
                    </div>
                  </div>
                  <div className="inputgender">
                    <label className="form-label">Gender</label>
                    <div>
                      <label className="gender_label" htmlFor="male">
                        Male
                      </label>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        className="gender"
                        onClick={(event) => setGender(event.target.value)}
                        defaultChecked
                      ></input>
                      <label className="gender_label" htmlFor="female">
                        Female
                      </label>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        className="gender"
                        onClick={(event) => setGender(event.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="inputaddress mt-3">
                    <label htmlFor="inputaddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      className={
                        validate_input.isValidAddress
                          ? "form-control form-control-lg"
                          : "form-control form-control-lg is-invalid"
                      }
                      id="inputaddress"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    ></input>
                    <div
                      id="validationServerUsernameFeedback"
                      className="invalid-feedback"
                    >
                      Please enter a address.
                    </div>
                  </div>
                  <div className="inputsubmit">
                    <button
                      className="btn green btn-lg mt-5"
                      onClick={() => register()}
                    >
                      Create account !
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="content_right col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
