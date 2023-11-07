import { Box, Button, TextField } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { Form } from "react-bootstrap"
import { apiData } from "../ApiContext"
import axios from "axios"
import { ApiFormData } from "../../App"
import { Link } from "react-router-dom"

export const ApiFormDy = () => {
    let gformData = useContext(ApiFormData)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let a = await apiData()
        gformData.setUserArr([...a])
    }

    const saveData = (e) => {
        if (e.target.type === "checkbox") {
            gformData.userObj[e.target.name] =
                gformData.userObj[e.target.name] ?? []
            gformData.blankObj[e.target.name] = []
            if (e.target.checked) {
                gformData.userObj[e.target.name] = [
                    ...gformData.userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                gformData.userObj[e.target.name] = gformData.userObj[
                    e.target.name
                ]?.filter((x) => x !== e.target.value)
            }
        } else if (e.target.type === "file") {
            gformData.userObj[e.target.name] = e.target.files[0]
            gformData.blankObj[e.target.name] = ""
        } else {
            gformData.userObj[e.target.name] = e.target.value
            gformData.blankObj[e.target.name] = ""
        }
        gformData.setUserObj({ ...gformData.userObj })
        gformData.setBlankObj({ ...gformData.blankObj })
    }

    const addData = () => {
        let formData = new FormData()

        formData.append("firstName", gformData.userObj.firstName)
        formData.append("lastName", gformData.userObj.lastName)
        formData.append("age", gformData.userObj.age)
        formData.append("gender", gformData.userObj.gender)
        formData.append("hobbies", gformData.userObj.hobbies)
        formData.append("city", gformData.userObj.city)
        formData.append("userImage", gformData.userObj.userImage)

        axios
            .post(
                "https://student-api.mycodelibraries.com/api/user/add",
                formData
            )
            .then((response) => {
                getData()
            })
        gformData.setUserObj({ ...gformData.blankObj })
    }

    const editUser = async () => {
        let formData = new FormData()

        formData.append("firstName", gformData.userObj.firstName)
        formData.append("lastName", gformData.userObj.lastName)
        formData.append("age", gformData.userObj.age)
        formData.append("gender", gformData.userObj.gender)
        formData.append("hobbies", gformData.userObj.hobbies)
        formData.append("city", gformData.userObj.city)
        formData.append("userImage", gformData.userObj.userImage)
        formData.append("id", gformData.userObj._id)

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
        if (gformData.userObj._id) {
            editUser()
        } else {
            addData()
        }
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
                    }}>
                    <div>
                        <TextField
                            label="First Name"
                            name="firstName"
                            type="text"
                            value={gformData.userObj.firstName ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={gformData.userObj.lastName ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            label="Age"
                            name="age"
                            value={gformData.userObj.age ?? ""}
                            type="number"
                            onChange={saveData}
                        />
                        <Form.Label className="d-block">Gender</Form.Label>
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            label="Male"
                            checked={gformData.userObj.gender === "male"}
                            onChange={saveData}
                            value={"male"}
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            label="Female"
                            checked={gformData.userObj.gender === "female"}
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
                                gformData.userObj.hobbies?.includes(
                                    "Traveling"
                                ) === true
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
                                gformData.userObj.hobbies?.includes(
                                    "Gaming"
                                ) === true
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
                                gformData.userObj.hobbies?.includes(
                                    "Coding"
                                ) === true
                            }
                            onChange={saveData}
                            label="Coding"
                            value="Coding"
                        />
                        <TextField
                            label="City"
                            name="city"
                            type="text"
                            value={gformData.userObj.city ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            name="userImage"
                            type="file"
                            onChange={saveData}
                        />
                    </div>
                    <Link to="/ApiTableDy">
                        <Button
                            sx={{ margin: "5px" }}
                            variant="contained"
                            onClick={submitData}>
                            Submit
                        </Button>
                    </Link>
                    <Link to="/ApiTableDy">
                        <Button
                            sx={{ margin: "5px" }}
                            variant="contained"
                            color="secondary">
                            Table Data
                        </Button>
                    </Link>
                </Box>
            </div>
        </>
    )
}
