import { Button } from "@mui/material"
import axios from "axios"
import React, { useContext, useEffect } from "react"
import { Table } from "react-bootstrap"
import { apiData } from "../ApiContext"
import { ApiFormData } from "../../App"
import { Link, useNavigate } from "react-router-dom"

export const ApiTableDy = () => {
    const gformData = useContext(ApiFormData)
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let a = await apiData()
        gformData.setUserArr([...a])
    }

    const sendData = (x) => {
        if (x.firstName !== "") {
            navigate("/ApiUsersDy/" + x._id)
        }
    }

    // const editUser = async () => {
    //     let formData = new FormData()

    //     formData.append("firstName", gformData.userObj.firstName)
    //     formData.append("lastName", gformData.userObj.lastName)
    //     formData.append("age", gformData.userObj.age)
    //     formData.append("gender", gformData.userObj.gender)
    //     formData.append("hobbies", gformData.userObj.hobbies)
    //     formData.append("city", gformData.userObj.city)
    //     formData.append("userImage", gformData.userObj.userImage)
    //     formData.append("id", gformData.userObj._id)

    //     axios
    //         .post(
    //             "https://student-api.mycodelibraries.com/api/user/update",
    //             formData
    //         )
    //         .then((response) => {
    //             getData()
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    // const deleteData = (id) => {
    //     axios
    //         .delete(
    //             "https://student-api.mycodelibraries.com/api/user/delete?id=" +
    //                 id
    //         )
    //         .then((response) => {
    //             getData()
    //         })
    // }

    const clearData = () => {
        axios
            .get("https://student-api.mycodelibraries.com/api/user/get")
            .then((response) => {
                response.data.data.map((x) => {
                    axios
                        .delete(
                            "https://student-api.mycodelibraries.com/api/user/delete?id=" +
                                x._id
                        )
                        .then((response) => {
                            getData()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    return null // added this line to fix the problem
                })
            })
            .catch((error) => {
                console.log(error)
            })
        gformData.setUserObj({ ...gformData.blankObj })
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
                className="mt-4 text-center shadow border-dark-subtle"
                striped
                bordered
                hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/* <th>Age</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th>City</th>
                        <th colSpan={2}>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {gformData.userArr.map((x, i) => {
                        return (
                            <tr key={i} onClick={() => sendData(x)}>
                                <td>
                                    <img
                                        className="rounded-circle"
                                        src={x.image}
                                        alt=""
                                        width={50}
                                        height={50}
                                    />
                                </td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.firstName}
                                </td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.lastName}
                                </td>
                                {/* <td style={{ padding: "20px 0" }}>{x.age}</td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.gender}
                                </td>
                                <td style={{ padding: "20px 0" }}>
                                    {x.hobbies.join(",")}
                                </td>
                                <td style={{ padding: "20px 0" }}>{x.city}</td> */}
                                {/* <td
                                    className="d-flex justify-content-evenly"
                                    style={{ padding: "15px 0" }}>
                                    <Button
                                        onClick={() => editUser(x)}
                                        variant="contained"
                                        color="info">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => deleteData(x._id)}
                                        variant="contained"
                                        color="error">
                                        Delete
                                    </Button>
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
