import { Box, Button, TextField } from "@mui/material"
import React, { Component } from "react"
import { Form, Table } from "react-bootstrap"
import { apiData } from "./ApiContext"
import axios from "axios"

export default class ApiCrudClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userObj: {},
            userArr: [],
            blankObj: {},
        }
    }

    componentDidMount() {
        this.getData()
    }

    saveData = (e) => {
        if (e.target.type === "checkbox") {
            this.state.userObj[e.target.name] =
                this.state.userObj[e.target.name] ?? []
            this.state.blankObj[e.target.name] = []
            if (e.target.checked) {
                this.state.userObj[e.target.name] = [
                    ...this.state.userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                this.state.userObj[e.target.name] = this.state.userObj[
                    e.target.name
                ].filter((x) => x !== e.target.value)
            }
        } else {
            this.state.userObj[e.target.name] = e.target.value
            this.state.blankObj[e.target.name] = ""
        }
        this.setState({ ...this.state })
    }

    submitData = () => {
        if (this.state.userObj._id) {
            this.state.userObj.id = this.state.userObj._id
            axios
                .post(
                    "https://student-api.mycodelibraries.com/api/user/update",
                    this.state.userObj
                )
                .then((response) => {
                    this.getData()
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios
                .post(
                    "https://student-api.mycodelibraries.com/api/user/add",
                    this.state.userObj
                )
                .then((response) => {
                    this.getData()
                })
        }
        this.setState({ userObj: { ...this.state.blankObj } })
        // this.setState({ ...this.state })
    }

    editData = (x) => {
        this.setState({
            userObj: {...x},
        })
    }

    deleteData = (id) => {
        axios
            .delete(
                "https://student-api.mycodelibraries.com/api/user/delete?id=" +
                    id
            )
            .then((response) => {
                this.getData()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getData = async () => {
        let a = await apiData()
        this.setState({ userArr: a })
    }

    clearData = () => {
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
                            this.getData()
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
    }

    render() {
        return (
            <>
                <div className="form mx-auto shadow p-2" style={{width: "38%"}}>
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
                                value={this.state.userObj.firstName ?? ""}
                                onChange={this.saveData}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                type="text"
                                value={this.state.userObj.lastName ?? ""}
                                onChange={this.saveData}
                            />
                            <TextField
                                label="Age"
                                name="age"
                                value={this.state.userObj.age ?? ""}
                                type="number"
                                onChange={this.saveData}
                            />
                            <Form.Label className="d-block ms-2">
                                Gender
                            </Form.Label>
                            <Form.Check
                                className="d-inline-block ms-2 me-2"
                                type="radio"
                                name="gender"
                                label="Male"
                                checked={this.state.userObj.gender === "male"}
                                onChange={this.saveData}
                                value={"male"}
                            />
                            <Form.Check
                                className="d-inline-block ms-2 me-2"
                                type="radio"
                                name="gender"
                                label="Female"
                                checked={this.state.userObj.gender === "female"}
                                onChange={this.saveData}
                                value={"female"}
                            />
                            <Form.Label className="d-block ms-2 my-2">
                                Hobbies
                            </Form.Label>
                            <Form.Check
                                className="d-inline-block ms-2 me-2"
                                type="checkbox"
                                name="hobbies"
                                checked={
                                    this.state.userObj.hobbies?.includes(
                                        "Traveling"
                                    ) === true
                                }
                                onChange={this.saveData}
                                label="Traveling"
                                value="Traveling"
                            />
                            <Form.Check
                                className="d-inline-block ms-2 me-2"
                                type="checkbox"
                                name="hobbies"
                                checked={
                                    this.state.userObj.hobbies?.includes(
                                        "Gaming"
                                    ) === true
                                }
                                onChange={this.saveData}
                                label="Gaming"
                                value="Gaming"
                            />
                            <Form.Check
                                className="d-inline-block ms-2 me-2"
                                type="checkbox"
                                name="hobbies"
                                checked={
                                    this.state.userObj.hobbies?.includes(
                                        "Coding"
                                    ) === true
                                }
                                onChange={this.saveData}
                                label="Coding"
                                value="Coding"
                            />
                            <TextField
                                label="City"
                                name="city"
                                type="text"
                                value={this.state.userObj.city ?? ""}
                                onChange={this.saveData}
                            />
                            {/* <TextField
                                name="image"
                                type="file"
                                value={this.state.userObj.image ?? ""}
                                onChange={this.saveData}
                            /> */}
                        </div>
                        <Button
                            className="mt-3"
                            sx={{ margin: "5px" }}
                            variant="contained"
                            color="secondary"
                            onClick={this.submitData}>
                            Submit
                        </Button>
                        <Button
                            className="mt-3"
                            sx={{ margin: "5px" }}
                            variant="contained"
                            color="error"
                            onClick={this.clearData}>
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
                        {this.state.userArr?.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td>{x.firstName}</td>
                                    <td>{x.lastName}</td>
                                    <td>{x.age}</td>
                                    <td>{x.gender}</td>
                                    <td>{x.hobbies.join(",")}</td>
                                    <td>{x.city}</td>
                                    <td className="d-flex justify-content-evenly">
                                        <Button
                                            onClick={() => this.editData(x)}
                                            variant="contained"
                                            color="secondary">
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                this.deleteData(x._id)
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
            </>
        )
    }
}
