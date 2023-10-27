import { UserContext } from "../../context/userProvider";
import "../main/main.scss";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "../main/modalDelete";
import ModalUser from "../main/modalUser";
const { getAllUser, deleteUser } = require("../../services/userService");

const Main = () => {
  const { user } = useContext(UserContext);
  const [listuser, setlistuser] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [currentLimit, setcurrentLimit] = useState(10);
  const [totalPage, settotalPage] = useState(0);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [dataModalDelete, setdataModalDelete] = useState({});
  const [showModalCreate, setshowModalCreate] = useState(false);
  const [typeOfModal, settypeOfModal] = useState("");
  const [dataModalUser, setdataModalUser] = useState({});

  useEffect(() => {
    getListUser();
  }, [currentPage]);

  const getListUser = async () => {
    let res = await getAllUser(currentPage, currentLimit);
    if (res && res.DT && res.EC === 0) {
      setlistuser(res.DT.users);
      settotalPage(res.DT.totalPages);
    }
  };

  const handlePageClick = (event) => {
    setcurrentPage(+event.selected + 1);
  };

  const handleDelete = async (user) => {
    setdataModalDelete(user);
    setshowModalDelete(true);
  };

  const handleClose = () => {
    setshowModalDelete(false);
    setdataModalDelete({});
  };

  const handleCloseCreateModal = () => {
    setdataModalUser({});
    setshowModalCreate(false);
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModalDelete);
    if (res.EC === 0) {
      await getListUser();
      toast.success(res.EM);
    } else {
      toast.warning("Can not delete");
    }
    setshowModalDelete(false);
  };

  const handleCreateUser = () => {
    settypeOfModal("CREATE");
    setshowModalCreate(true);
  };

  const handleUpdateUser = (user) => {
    setdataModalUser(user);
    settypeOfModal("UPDATE");
    setshowModalCreate(true);
  };

  return (
    <>
      <div className="container">
        <div className="main_container">
          <div className="main_header">
            <h1>List User</h1>
            <div className="actions my-3">
              <button className="btn btn-success me-3">Refesh </button>
              <button
                className="btn btn-primary addnew "
                onClick={() => handleCreateUser()}
              >
                Add new user
              </button>
            </div>
          </div>
          <div className="main_body">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Position</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {listuser && listuser.length > 0 ? (
                  <>
                    {listuser.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.sex}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.position.name}</td>
                          <td className="d-flex justify-content-around">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleUpdateUser(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
          {totalPage > 0 && (
            <div className="main_footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={currentLimit}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={showModalDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        user={dataModalDelete}
      ></ModalDelete>
      <ModalUser
        showModalCreate={showModalCreate}
        typeOfModal={typeOfModal}
        handleClose={handleCloseCreateModal}
        handleUpdate={getListUser}
        dataModalUser={dataModalUser}
      ></ModalUser>
    </>
  );
};
export default Main;
