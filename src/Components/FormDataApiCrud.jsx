import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Form, Table } from "react-bootstrap"
import { apiData } from "./ApiContext"

export const FormDataApiCrud = () => {
    let [userObj, setUserObj] = useState({})
    let [userArr, setUserArr] = useState([])
    let [blankObj, setBlankObj] = useState({})

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
        } else if (e.target.type === "file") {
            userObj[e.target.name] = e.target.files[0]
            blankObj[e.target.name] = ""
        } else {
            userObj[e.target.name] = e.target.value
            blankObj[e.target.name] = ""
        }
        setUserObj({ ...userObj })
        setBlankObj({ ...blankObj })
    }

    const getData = async () => {
        let a = await apiData()
        setUserArr([...a])
    }

    const addData = () => {
        let formData = new FormData()

        formData.append("firstName", userObj.firstName)
        formData.append("lastName", userObj.lastName)
        formData.append("age", userObj.age)
        formData.append("gender", userObj.gender)
        formData.append("hobbies", userObj.hobbies)
        formData.append("city", userObj.city)
        formData.append("userImage", userObj.userImage)

        axios
            .post(
                "https://student-api.mycodelibraries.com/api/user/add",
                formData
            )
            .then((response) => {
                getData()
            })
        setUserObj({ ...blankObj })
    }

    const editUser = (x) => {
        x.id = x._id
        userObj = { ...x }
        setUserObj({ ...userObj })
        console.log(userObj)
    }

    const editData = async () => {
        let formData = new FormData()

        formData.append("firstName", userObj.firstName)
        formData.append("lastName", userObj.lastName)
        formData.append("age", userObj.age)
        formData.append("gender", userObj.gender)
        formData.append("hobbies", userObj.hobbies)
        formData.append("city", userObj.city)
        formData.append("userImage", userObj.userImage)
        formData.append("id", userObj._id)

        axios
            .post(
                "https://student-api.mycodelibraries.com/api/user/update",
                formData
            )
            .then((response) => {
                getData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const submitData = () => {
        if (userObj._id) {
            editData()
        } else {
            addData()
        }
    }

    const deleteData = (id) => {
        axios
            .delete(
                "https://student-api.mycodelibraries.com/api/user/delete?id=" +
                    id
            )
            .then((response) => {
                getData()
            })
    }

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
        setUserObj({ ...blankObj })
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
                        <TextField
                            name="userImage"
                            type="file"
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
                        Clear All Data
                    </Button>
                </Box>
            </div>

            <Table
                className="mt-5 text-center shadow border-dark-subtle"
                striped
                bordered
                hover>
                <thead>
                    <tr>
                        <th>Image</th>
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
                                <td>
                                    <img
                                        className="rounded-circle"
                                        src={x.image}
                                        alt=""
                                        width={50}
                                        height={50}
                                    />
                                </td>
                                <td style={{padding: "20px 0"}}>{x.firstName}</td>
                                <td style={{padding: "20px 0"}}>{x.lastName}</td>
                                <td style={{padding: "20px 0"}}>{x.age}</td>
                                <td style={{padding: "20px 0"}}>{x.gender}</td>
                                <td style={{padding: "20px 0"}}>{x.hobbies.join(",")}</td>
                                <td style={{padding: "20px 0"}}>{x.city}</td>
                                <td
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
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}
