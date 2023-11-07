import React, { Component } from "react"
import { FormDataContext } from "./AllContext"
import { Table } from "react-bootstrap"
import { Button } from "@mui/material"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { motion } from "framer-motion"

export default class CTableCrud extends Component {
    
    static contextType = FormDataContext

    componentDidMount() {
        this.context.setuserArr(
            JSON.parse(localStorage.getItem("userArr")) ?? []
        )
        this.context.setcountId(
            JSON.parse(localStorage.getItem("countId")) ?? 0
        )
    }

    componentDidUpdate() {
        localStorage.setItem("userArr", JSON.stringify(this.context.userArr))
        localStorage.setItem("countId", JSON.stringify(this.context.countId))
    }

    editData = (id) => {
        this.context.setuserObj({ ...id })
    }

    deleteData = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your data has been deleted.", "success")
                let filterArr = this.context.userArr.filter((x) => x.id !== id)
                this.context.setuserArr(filterArr)
            }
        })
    }

    clearData = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your data has been deleted.", "success")
                this.context.setuserArr([])
            }
        })
    }

    render() {
        return (
            <>
                <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                    }}>
                    <div className="buttons my-3 ms-5 ">
                        <Link to="/">
                            <Button
                                className="me-4"
                                variant="contained"
                                color="secondary">
                                Back To Form
                            </Button>
                        </Link>
                        <Button
                            sx={{ margin: "5px" }}
                            variant="contained"
                            color="error"
                            onClick={() => this.clearData()}>
                            Clear All Data
                        </Button>
                    </div>
                    <Table
                        className="text-center shadow border-info "
                        striped
                        bordered
                        variant="info"
                        responsive
                        hover>
                        <thead>
                            <tr>
                                <th>Profile Image</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Hobbies</th>
                                <th>City</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.context.userArr.map((item, index) => {
                                return (
                                    <tr className="table-row" key={index}>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt=""
                                                width="50px"
                                                height="50px"
                                            />
                                        </td>
                                        <td style={{ padding: "20px 0" }}>
                                            {item.firstName}
                                        </td>
                                        <td style={{ padding: "20px 0" }}>
                                            {item.lastName}
                                        </td>
                                        <td style={{ padding: "20px 0" }}>
                                            {item.age}
                                        </td>
                                        <td style={{ padding: "20px 0" }}>
                                            {item.gender}
                                        </td>
                                        <td style={{ padding: "20px 0" }}>
                                            {item.hobbies?.join(",")}
                                        </td>
                                        <td style={{ padding: "20px 0" }}>
                                            {item.city}
                                        </td>
                                        <td
                                            style={{ padding: "15px 0" }}
                                            className="d-flex justify-content-evenly">
                                            <Link to="/">
                                                <Button
                                                    onClick={() =>
                                                        this.editData(item)
                                                    }
                                                    variant="contained"
                                                    color="secondary">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() =>
                                                    this.deleteData(item.id)
                                                }
                                                variant="contained"
                                                color="error">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </motion.div>
            </>
        )
    }
}
