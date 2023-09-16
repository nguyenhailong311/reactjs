import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../services/UserService';
import ModalAddNew from './ModalAddNew';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModelEditUser';
import ModalConfirm from './ModalConfirm';
import {debounce} from 'lodash';
import './TableUser.scss';
import {CSVLink} from "react-csv";
import Papa from 'papaparse';
import {toast} from 'react-toastify';
const TableUsers = (props) => {
    const _ = require('lodash'); 
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageUsers, setPageUsers] = useState([]);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");
    const [keyword, setKeyword] = useState("");
    const [dataExport, setDataExport] = useState([]);
    const handleUpdateTable = (user) => {
        user.id = listUsers[listUsers.length - 1].id + 1;
        const newUsers = [...listUsers, user];
        setListUsers(newUsers);
        setPageUsers(newUsers.slice(page * 5, page * 5 + 5));
        setTotalPages(Math.ceil((listUsers.length + 1)/ 5));
        // setPageUsers(listUsers.slice(0, 5));
    }
    const handleEditTable = (user, index) => {
        const newUsers = listUsers;
        newUsers[index - 1] = user;
        setPageUsers(newUsers.slice(page * 5, page * 5 + 5));
        setListUsers(newUsers);
    }
    useEffect(() => {
        getUsers();
    }, [])
    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res) {
            setListUsers(res);
            setTotalPages(Math.ceil(res.length / 5));
            setPageUsers(res.slice(0, 5));
        }
    }
    const handlePageClick = (event) => {
        const start = event.selected * 5;
        const end = start + 5;
        const newUsers = listUsers.slice(start, end);
        setPage(event.selected);
        setPageUsers(newUsers);
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    }
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }
    const handleDelete = (user) => {
        const newUsers = listUsers;
        const deleteUsers = newUsers.filter((item, index) => index !== user.id - 1);
        setListUsers(deleteUsers);
        setPageUsers(deleteUsers.slice(page * 5, page * 5 + 5));
        setTotalPages(Math.ceil((listUsers.length - 1)/ 5));
    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneUsers = _.cloneDeep(listUsers);
        let sortUsers = _.orderBy(cloneUsers, [sortField], [sortBy]);
        setPageUsers(sortUsers.slice(page * 5, page * 5 + 5));
        setListUsers(sortUsers);
    }
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        setKeyword(term);
        if (term) {
            let cloneUsers = _.cloneDeep(listUsers);
            let searchUsers = cloneUsers.filter(item => item.name.includes(term));
            setPageUsers(searchUsers.slice(page * 5, page * 5 + 5));
            setListUsers(searchUsers);
            setTotalPages(Math.ceil((searchUsers.length) / 5));
        } else {
            getUsers();
        }
    }, 500);
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Admed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labed", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"],
    ]
    const getUsersExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["ID", "Name", "Email", "Username"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.name;
                arr[2] = item.email;
                arr[3] = item.username;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }
    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept CSV file!");
                return;
            }
            Papa.parse(file, {
                // header: true,
                complete: function(results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "name" || rawCSV[0][1] !== "email" || rawCSV[0][2] !== "username") {
                                toast.error("Wrong format file!");
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.id = index;
                                        obj.name = item[0];
                                        obj.email = item[1];
                                        obj.username = item[2];
                                        result.push(obj);
                                    }
                                })
                                setPageUsers(result.slice(page * 5, page * 5 + 5));
                                setListUsers(result);
                                setTotalPages(Math.ceil((result.length) / 5));
                            }
                        } else toast.error("Wrong format file!");
                    } else{ 
                        toast.error("Data not found!");
                    }
                }
            })
        }
    }
    return (
    <>
        <div className="my-3 d-flex justify-content-between align-items-center">
            <span className="">List users:</span>
            <div className="">
                <label htmlFor="import" className="btn btn-secondary me-2"><i className="fa-solid fa-file-import me-2"></i>Import</label>
                <input type="file" id="import" hidden className="form-control" onChange={(event) => {handleImportCSV(event)}}/>
                <CSVLink 
                    data={dataExport} 
                    filename={"users.csv"} 
                    className="btn btn-success me-2"
                    asyncOnClick={true}
                    onClick={getUsersExport}
                >
                    <i className="fa-solid fa-file-arrow-down me-2"></i>
                    Export
                </CSVLink>
                <button className="btn btn-primary" onClick={() => setIsShowModalAddNew(true)}><i className="fa-solid fa-circle-plus me-2"></i>Add new user</button>
            </div>            
        </div>
        <div className="row m-auto my-3 d-flex align-items-center justify-content-center">
            <div className="col col-2"><label className="form-label">Search: </label></div>
            <div className="col col-10"><input className="form-control" placeholder="Search user by name ..." value={keyword} onChange={(event) => handleSearch(event)}/></div>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className="sort-header">
                            <span>ID</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort("desc", "id")}></i>
                                <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort("asc", "id")}></i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className="sort-header">
                        <span>Name</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort("desc", "name")}></i>
                                <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort("asc", "name")}></i>
                            </span>
                        </div>
                    </th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {pageUsers && pageUsers.length > 0 && pageUsers.map((item, index) => {
                    return (
                        <tr key={`users-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                            <td>
                                <button className="btn btn-warning mx-2" onClick={() => handleEditUser(item)}>Edit</button>
                                <button className="btn btn-danger mx-2" onClick={() => handleDeleteUser(item)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <div className="d-flex justify-content-center">
            <ReactPaginate
                breakLabel="..."
                nextLabel="NEXT >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={totalPages}
                previousLabel="< PREVIOUS"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
        <ModalAddNew show={isShowModalAddNew} handleClose={() => setIsShowModalAddNew(false)} handleUpdateTable={handleUpdateTable}/>
        <ModalEditUser show={isShowModalEditUser} handleClose={() => setIsShowModalEditUser(false)} dataUserEdit={dataUserEdit} handleEditTable={handleEditTable}/>
        <ModalConfirm show={isShowModalDelete} handleClose={() => setIsShowModalDelete(false)} dataUserDelete={dataUserDelete} handleDelete={handleDelete}/>
    </>
    );
}
export default TableUsers;