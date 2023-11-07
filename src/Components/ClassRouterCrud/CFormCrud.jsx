import { Box, Button, TextField } from "@mui/material"
import React, { Component } from "react"
import { FormDataContext } from "./AllContext"
import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { motion } from "framer-motion"

export default class CFormCrud extends Component {

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

    saveData = async (e) => {
        if (e.target.type === "checkbox") {
            this.context.userObj[e.target.name] =
                this.context.userObj[e.target.name] ?? []
            this.context.blankObj[e.target.name] = []
            if (e.target.checked) {
                this.context.userObj[e.target.name] = [
                    ...this.context.userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                this.context.userObj[e.target.name] = this.context.userObj[
                    e.target.name
                ]?.filter((x) => x !== e.target.value)
            }
        } else if (e.target.type === "file") {
            this.context.userObj[e.target.name] = await this.toBase64(
                e.target.files[0]
            )
            this.context.blankObj[e.target.name] = ""
        } else {
            this.context.userObj[e.target.name] = e.target.value
            this.context.blankObj[e.target.name] = ""
        }
        this.context.setuserObj({ ...this.context.userObj })
        this.context.setblankObj({ ...this.context.blankObj })
    }

    submitData = () => {
        if (this.context.userObj.id === undefined) {
            this.context.countId++
            this.context.setcountId(this.context.countId)
            this.context.userObj.id = this.context.countId
            this.context.userArr.push(this.context.userObj)
        } else {
            let index = this.context.userArr.findIndex(
                (x) => x.id === this.context.userObj.id
            )
            this.context.userArr[index] = this.context.userObj
        }
        this.context.setuserArr([...this.context.userArr])
        this.context.setuserObj({})
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your data has been saved",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })

    render() {
        return (
            <>
                <motion.div
                    className="mt-3 form w-50 mx-auto shadow p-2"
                    initial={{ x: 100 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                    }}>
                    <h2 className="m-2 fs-2">Api Crud</h2>
                    <Box
                        component=""
                        sx={{
                            "& .MuiTextField-root": {
                                color: "red",
                                m: 1.4,
                                width: "19.3rem",
                            },
                        }}
                        noValidate
                        autoComplete="off">
                        <div>
                            <TextField
                                label="First Name"
                                name="firstName"
                                type="text"
                                value={this.context.userObj.firstName ?? ""}
                                onChange={this.saveData}
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                type="text"
                                value={this.context.userObj.lastName ?? ""}
                                onChange={this.saveData}
                            />
                            <TextField
                                label="Age"
                                name="age"
                                value={this.context.userObj.age ?? ""}
                                type="number"
                                onChange={this.saveData}
                            />
                            <TextField
                                label="City"
                                name="city"
                                type="text"
                                value={this.context.userObj.city ?? ""}
                                onChange={this.saveData}
                            />
                            <Form.Label className="ms-2 d-block">
                                Gender
                            </Form.Label>
                            <Form.Check
                                className="ms-2 d-inline-block me-2"
                                type="radio"
                                name="gender"
                                label="Male"
                                checked={this.context.userObj.gender === "male"}
                                onChange={this.saveData}
                                value={"male"}
                            />
                            <Form.Check
                                className="d-inline-block me-2"
                                type="radio"
                                name="gender"
                                label="Female"
                                checked={
                                    this.context.userObj.gender === "female"
                                }
                                onChange={this.saveData}
                                value={"female"}
                            />
                            <Form.Label className="ms-2 d-block my-2">
                                Hobbies
                            </Form.Label>
                            <Form.Check
                                className="ms-2 d-inline-block me-2"
                                type="checkbox"
                                name="hobbies"
                                checked={
                                    this.context.userObj.hobbies?.includes(
                                        "Traveling"
                                    ) === true
                                }
                                onChange={this.saveData}
                                label="Traveling"
                                value="Traveling"
                            />
                            <Form.Check
                                className="d-inline-block me-2"
                                type="checkbox"
                                name="hobbies"
                                checked={
                                    this.context.userObj.hobbies?.includes(
                                        "Gaming"
                                    ) === true
                                }
                                onChange={this.saveData}
                                label="Gaming"
                                value="Gaming"
                            />
                            <Form.Check
                                className="d-inline-block me-2"
                                type="checkbox"
                                name="hobbies"
                                checked={
                                    this.context.userObj.hobbies?.includes(
                                        "Coding"
                                    ) === true
                                }
                                onChange={this.saveData}
                                label="Coding"
                                value="Coding"
                            />
                            <br />
                            <TextField
                                className=" my-3"
                                name="image"
                                type="file"
                                onChange={this.saveData}
                            />
                            <br />
                            <img
                                className="ms-2 my-2  rounded-circle"
                                src={this.context.userObj.image}
                                style={{
                                    width: "auto",
                                    height: "auto",
                                    maxWidth: "80px",
                                    maxHeight: "80px",
                                }}
                                alt=""
                            />
                            <br />
                            <Button
                                className="my-2"
                                sx={{ margin: "5px" }}
                                variant="contained"
                                onClick={() => this.submitData()}>
                                Submit
                            </Button>
                            <Link to="/CTableCrud">
                                <Button
                                    sx={{ margin: "5px" }}
                                    variant="contained"
                                    color="secondary">
                                    Table Data
                                </Button>
                            </Link>
                        </div>
                    </Box>
                </motion.div>
            </>
        )
    }
}
