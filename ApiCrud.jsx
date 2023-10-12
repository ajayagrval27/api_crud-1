import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Form, Table } from "react-bootstrap"
import { apiData } from "./ApiContext"

export const ApiCrud = () => {
    let [userObj, setuserObj] = useState({})
    let [userArr, setuserArr] = useState([])
    let [blankObj, setblankObj] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const saveData = (e) => {
        if (e.target.type === "checkbox") {
            userObj[e.target.name] = userObj[e.target.name] ?? []
            blankObj[e.target.name] = []
            if (e.target.checked) {
                userObj[e.target.name] = [
                    ...userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                userObj[e.target.name] = userObj[e.target.name]?.filter(
                    (x) => x !== e.target.value
                )
            }
        } else {
            userObj[e.target.name] = e.target.value
            blankObj[e.target.name] = ""
        }
        setuserObj({ ...userObj })
        setblankObj({ ...blankObj })
    }

    const submitData = () => {
        // console.log(userObj._id)
        if (userObj._id) {
            userObj.id = userObj._id
            axios
                .post(
                    "https://student-api.mycodelibraries.com/api/student/update",
                    userObj
                )
                .then((response) => {
                    getData()
                    setuserObj({ ...blankObj })
                })
        } else {
            axios
                .post(
                    "https://student-api.mycodelibraries.com/api/student/add",
                    userObj
                )
                .then((response) => {
                    getData()
                    setuserObj({ ...blankObj })
                })
        }
    }

    const getData = async () => {
        let a = await apiData()
        setuserArr([...a])
    }

    const editData = (x) => {
        setuserObj({ ...x })
    }

    const clearData = () => {
        axios
            .get("https://student-api.mycodelibraries.com/api/student/get")
            .then((response) => {
                response.data.data.map((x) => {
                    axios
                        .delete(
                            "https://student-api.mycodelibraries.com/api/student/delete?id=" +
                                x._id
                        )
                        .then((response) => {
                            getData()
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    return null; // added this line to fix the problem
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteData = (id) => {
        console.log(id)
        axios
            .delete(
                "https://student-api.mycodelibraries.com/api/student/delete?id=" +
                    id
            )
            .then((response) => {
                getData()
            })
    }

    return (
        <>
            <div className="form w-50 mx-auto shadow p-2 text-center">
                <h2 className="m-2 fs-2">Api Crud</h2>
                <Box
                    component=""
                    sx={{
                        "& .MuiTextField-root": {
                            color: "red",
                            m: 1,
                            width: "30rem",
                        },
                    }}
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField
                            label="First Name"
                            name="firstName"
                            type="text"
                            value={userObj.firstName ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={userObj.lastName ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            label="Age"
                            name="age"
                            value={userObj.age ?? ""}
                            type="number"
                            onChange={saveData}
                        />
                        <Form.Label className="d-block">Gender</Form.Label>
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            label="Male"
                            checked={userObj.gender === "male"}
                            onChange={saveData}
                            value={"male"}
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            label="Female"
                            checked={userObj.gender === "female"}
                            onChange={saveData}
                            value={"female"}
                        />
                        <Form.Label className="d-block my-2">
                            Hobbies
                        </Form.Label>
                        <Form.Check
                            className="d-inline-block me-2"
                            type="checkbox"
                            name="hobbies"
                            checked={
                                userObj.hobbies?.includes("Traveling") === true
                            }
                            onChange={saveData}
                            label="Traveling"
                            value="Traveling"
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="checkbox"
                            name="hobbies"
                            checked={
                                userObj.hobbies?.includes("Gaming") === true
                            }
                            onChange={saveData}
                            label="Gaming"
                            value="Gaming"
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="checkbox"
                            name="hobbies"
                            checked={
                                userObj.hobbies?.includes("Coding") === true
                            }
                            onChange={saveData}
                            label="Coding"
                            value="Coding"
                        />
                        <TextField
                            label="City"
                            name="city"
                            type="text"
                            value={userObj.city ?? ""}
                            onChange={saveData}
                        />
                    </div>
                    <Button
                        sx={{ margin: "5px" }}
                        variant="contained"
                        onClick={submitData}>
                        Submit
                    </Button>
                    <Button
                        sx={{ margin: "5px" }}
                        variant="contained"
                        color="error"
                        onClick={clearData}>
                        Clear
                    </Button>
                </Box>
            </div>

            <Table
                className="mt-5 text-center shadow border-info "
                striped
                bordered
                hover>
                <thead>
                    <tr>
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
                    {userArr.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.age}</td>
                                <td>{x.gender}</td>
                                <td>{x.hobbies.join(',')}</td>
                                <td>{x.city}</td>
                                <td className="d-flex justify-content-evenly">
                                    <Button
                                        onClick={() => editData(x)}
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
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
