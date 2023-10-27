import { useEffect, useState } from "react";
import { ListGroup, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { toast } from "react-toastify";
const {
  positionList,
  createNewUser,
  updateUser,
} = require("../../services/userService");
const ModalUser = (props) => {
  const defaultDataUSer = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    gender: "",
    position: "",
  };
  const [groupList, setgroupList] = useState([]);
  const [userData, setuserData] = useState(defaultDataUSer);

  useEffect(() => {
    getgroupList();
  }, []);
  useEffect(() => {
    if (props.typeOfModal === "UPDATE") {
      console.log(":check data dataM", props.dataModalUser);
      setuserData({
        ...props.dataModalUser,
        position: props.dataModalUser.position
          ? props.dataModalUser.position.id
          : "",
        gender: props.dataModalUser.sex ? props.dataModalUser.sex : "",
      });
    }
  }, [props.dataModalUser]);
  const getgroupList = async () => {
    let res = await positionList();
    setgroupList(res.DT);
  };
  const handleOnchangeInput = (value, ob) => {
    const _userdata = _.cloneDeep(userData);
    _userdata[ob] = value;
    setuserData(_userdata);
  };
  const defaultValid = {
    email: false,
    phone: false,
    username: false,
    password: false,
    address: false,
    gender: false,
    position: false,
  };
  const [valid, setvalid] = useState(defaultValid);
  const checkValid = () => {
    setvalid(defaultValid);
    let arr = [
      "email",
      "phone",
      "username",
      "password",
      "address",
      "gender",
      "position",
    ];
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        if (props.typeOfModal === "UPDATE" && arr[i] === "password") continue;
        else {
          toast.warning(`Please enter ${arr[i]}`);
          let tmpvalid = _.cloneDeep(defaultValid);
          tmpvalid[arr[i]] = true;
          setvalid(tmpvalid);
          return false;
        }
      }
    }
    return true;
  };
  const confirmUser = async () => {
    let check = checkValid();
    if (check) {
      const res = await createNewUser({
        ...userData,
        sex: userData["gender"],
        positionId: userData["position"],
      });
      if (res.EC !== 0) {
        toast.warning(res.EM);
        let tmpvalid = _.cloneDeep(defaultValid);
        tmpvalid[res.DT] = true;
        setvalid(tmpvalid);
      } else {
        props.handleClose();
        setuserData(defaultDataUSer);
        props.handleUpdate();
        toast.success(res.EM);
      }
    }
  };
  const confirmUpdateUser = async () => {
    const check = checkValid();
    try {
      if (check) {
        const res = await updateUser({
          ...userData,
          sex: userData["gender"],
          positionId: userData["position"],
        });
        if (res.EC === 0) {
          toast.success(res.EM);
          handleCloseModalUSer();
          props.handleUpdate();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModalUSer = () => {
    console.log("close");
    setvalid(defaultValid);
    props.handleClose();
  };
  return (
    <>
      <Modal
        show={props.showModalCreate}
        centered
        size="lg"
        onHide={props.handleClose}
      >
        <Modal.Header closeButton onHide={() => handleCloseModalUSer()}>
          <Modal.Title>
            {props.typeOfModal === "CREATE"
              ? "Create a new User"
              : "Update a User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="mb-3 col-12 col-sm-6">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={
                    valid.email ? "form-control is-invalid" : "form-control"
                  }
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  disabled={props.typeOfModal === "UPDATE" ? true : false}
                  value={userData.email || ""}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "email")
                  }
                />
              </div>
              <div className="mb-3 col-12 col-sm-6">
                <label htmlFor="phonenumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className={
                    valid.phone ? "form-control is-invalid" : "form-control"
                  }
                  disabled={props.typeOfModal === "UPDATE" ? true : false}
                  id="phonenumber"
                  value={userData.phone || ""}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "phone")
                  }
                />
              </div>
              <div className="mb-3 col-12 col-sm-6">
                <label htmlFor="username" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className={
                    valid.username ? "form-control is-invalid" : "form-control"
                  }
                  id="username"
                  value={userData.username || ""}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "username")
                  }
                />
              </div>
              {props.typeOfModal === "CREATE" && (
                <div className="mb-3 col-12 col-sm-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={
                      valid.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="password"
                    value={userData.password || ""}
                    onChange={(event) =>
                      handleOnchangeInput(event.target.value, "password")
                    }
                  />
                </div>
              )}
              <div className="mb-3 col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className={
                    valid.address ? "form-control is-invalid" : "form-control"
                  }
                  id="address"
                  value={userData.address || ""}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "address")
                  }
                />
              </div>
              <div className="mb-3 col-12 col-sm-6">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className={
                    valid.gender ? "form-select is-invalid" : "form-select"
                  }
                  aria-label="Default select example"
                  onChange={(e) =>
                    handleOnchangeInput(e.target.value, "gender")
                  }
                  value={props.dataModalUser.sex}
                >
                  {props.typeOfModal === "CREATE" ? (
                    <option>Open this select menu</option>
                  ) : (
                    ""
                  )}
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other option</option>
                </select>
              </div>
              <div className="mb-3 col-12 col-sm-6">
                <label htmlFor="group" className="form-label">
                  Position
                </label>
                <select
                  className={
                    valid.position ? "form-select is-invalid" : "form-select"
                  }
                  aria-label="Default select example"
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "position")
                  }
                  value={userData.position}
                >
                  <option defaultValue>Open this select menu</option>
                  {groupList &&
                    groupList.length > 0 &&
                    groupList.map((items, index) => {
                      return (
                        <option key={("option", index)} value={items.id}>
                          {items.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalUSer()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.typeOfModal === "UPDATE"
                ? confirmUpdateUser()
                : confirmUser();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUser;
