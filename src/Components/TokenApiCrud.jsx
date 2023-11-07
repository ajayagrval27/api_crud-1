import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material"
import { purple } from "@mui/material/colors"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Table } from "react-bootstrap"

export const TokenApiCrud = () => {
    let [userObj, setuserObj] = useState({})
    let [userArray, setuserArray] = useState([])
    let [blankObj, setblankObj] = useState({})

    useEffect(() => {
        getData()
    }, [])

    let auth = {
        headers: {
            Authorization:
                "Bearer 1cd9919d0972e2cdd9744606eac394c287cc25bc90aaf4d0c5281fea39224ec9",
        },
    }

    const saveData = (e) => {
        userObj[e.target.name] = e.target.value
        blankObj[e.target.name] = ""

        setuserObj({ ...userObj })
        setblankObj({ ...blankObj })
    }

    const getData = () => {
        axios
            .get("https://gorest.co.in/public/v2/users", auth)
            .then((response) => {
                setuserArray(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const submitData = () => {
        if (userObj.id === undefined) {
            axios
                .post("https://gorest.co.in/public/v2/users", userObj, auth)
                .then((response) => {
                    getData()
                })
        } else {
            axios
                .patch(
                    "https://gorest.co.in/public/v2/users/" + userObj.id,
                    userObj,
                    auth
                )
                .then((response) => {
                    getData()
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        setuserArray([...userArray, userObj])
        setuserObj({ ...blankObj })
    }

    const editData = (obj) => {
        setuserObj({ ...obj })
    }

    const deleteData = (id) => {
        axios
            .delete("https://gorest.co.in/public/v2/users/" + id, auth)
            .then((response) => {
                getData()
            })
    }

    return (
        <>
            <div className="mx-auto shadow p-2 mt-2" style={{ width: "38%" }}>
                <h2 className="text-center mb-3 mt-2">Token API CRUD</h2>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "30.5rem" },
                    }}>
                    <TextField
                        type="text"
                        name="name"
                        value={userObj.name ?? ""}
                        onChange={saveData}
                        label="Name"
                        variant="outlined"
                        color="secondary"
                    />
                    <TextField
                        type="email"
                        name="email"
                        value={userObj.email ?? ""}
                        onChange={saveData}
                        label="Email"
                        variant="outlined"
                        color="secondary"
                    />
                    <FormControl className="ms-2 my-2">
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row>
                            <FormControlLabel
                                control={
                                    <Radio
                                        name="gender"
                                        onChange={saveData}
                                        checked={userObj.gender === "male"}
                                        value={"male"}
                                        sx={{
                                            color: purple[800],
                                            "&.Mui-checked": {
                                                color: purple[600],
                                            },
                                        }}
                                    />
                                }
                                label="Male"
                            />
                            <FormControlLabel
                                control={
                                    <Radio
                                        name="gender"
                                        onChange={saveData}
                                        checked={userObj.gender === "female"}
                                        value={"female"}
                                        sx={{
                                            color: purple[800],
                                            "&.Mui-checked": {
                                                color: purple[600],
                                            },
                                        }}
                                    />
                                }
                                label="Female"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl className="ms-2 my-2 d-block">
                        <FormLabel>Status</FormLabel>
                        <RadioGroup row name="status">
                            <FormControlLabel
                                control={
                                    <Radio
                                        name="status"
                                        onChange={saveData}
                                        checked={userObj.status === "active"}
                                        value={"active"}
                                        sx={{
                                            color: purple[800],
                                            "&.Mui-checked": {
                                                color: purple[600],
                                            },
                                        }}
                                    />
                                }
                                label="Active"
                            />
                            <FormControlLabel
                                control={
                                    <Radio
                                        name="status"
                                        onChange={saveData}
                                        checked={userObj.status === "inactive"}
                                        value={"inactive"}
                                        sx={{
                                            color: purple[800],
                                            "&.Mui-checked": {
                                                color: purple[600],
                                            },
                                        }}
                                    />
                                }
                                label="Inactive"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        onClick={submitData}
                        variant="contained"
                        color="secondary"
                        className="ms-2 my-2">
                        Submit
                    </Button>
                    <Button
                        onClick={getData}
                        variant="contained"
                        color="secondary"
                        className="ms-2 my-2">
                        Get Data
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
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userArray.map((obj, index) => {
                        return (
                            <tr key={index}>
                                <td>{obj.id}</td>
                                <td>{obj.name}</td>
                                <td>{obj.email}</td>
                                <td>{obj.gender}</td>
                                <td>{obj.status}</td>
                                <td className="d-flex justify-content-evenly">
                                    <Button
                                        onClick={() => {
                                            editData(obj)
                                        }}
                                        variant="contained"
                                        color="secondary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            deleteData(obj.id)
                                        }}
                                        variant="contained"
                                        color="secondary">
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
