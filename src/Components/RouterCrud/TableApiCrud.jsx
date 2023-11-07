import { Button } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { FormData } from "../../App"

export const TableApiCrud = () => {
    const fData = useContext(FormData)

    useEffect(() => {
        const getArr = JSON.parse(localStorage.getItem("userArr"))
        const getId = JSON.parse(localStorage.getItem("countId"))
        if (getArr && getId) {
            fData.setuserArr(getArr)
            fData.setcountId(getId)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("userArr", JSON.stringify(fData.userArr))
        localStorage.setItem("countId", JSON.stringify(fData.countId))
    }, [fData.userArr, fData.countId])

    const editData = (x) => {
        fData.setuserObj({ ...x })
    }

    const deleteData = (id) => {
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
                let filterArr = fData.userArr.filter((x) => x.id !== id)
                fData.setuserArr([...filterArr])
            }
        })
    }

    const clearData = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, clear it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Cleared!", "Your file has been cleared.", "success")
                fData.setuserArr([])
                fData.setcountId(0)
                localStorage.clear()
            }
        })
    }

    return (
        <>
            <div className="buttons mt-4 ms-5">
                <Link to="/">
                    <Button className="me-4" variant="contained">
                        Back To Form
                    </Button>
                </Link>
                <Button
                    sx={{ margin: "5px" }}
                    variant="contained"
                    color="error"
                    onClick={clearData}>
                    Clear All Data
                </Button>
            </div>
            <Table
                className="mt-3 text-center shadow border-dark-subtle"
                striped
                bordered
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
                    {fData.userArr?.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <img
                                        src={x.image}
                                        alt=""
                                        width="50px"
                                        height="50px"
                                    />
                                </td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.firstName}
                                </td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.lastName}
                                </td>
                                <td style={{ padding: "20px 0" }}>{x.age}</td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.gender}
                                </td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.hobbies?.join(",")}
                                </td>
                                <td style={{ padding: "20px 0" }}>{x.city}</td>
                                <td
                                    style={{ padding: "15px 0" }}
                                    className="d-flex justify-content-evenly">
                                    <Link to="/">
                                        <Button
                                            onClick={() => editData(x)}
                                            variant="contained"
                                            color="info">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => deleteData(x.id)}
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
        </>
    )
}
