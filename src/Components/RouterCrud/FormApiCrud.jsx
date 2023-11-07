import { Box, Button, TextField } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FormData } from "../../App"
import Swal from "sweetalert2"

export const FormApiCrud = () => {
    const fData = useContext(FormData)

    useEffect(() => {
        const getArr = JSON.parse(localStorage.getItem("userArr") ?? [])
        const getId = JSON.parse(localStorage.getItem("countId") ?? 0)
        if (getArr && getId) {
            fData.setuserArr(getArr)
            fData.setcountId(getId)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("userArr", JSON.stringify(fData.userArr))
        localStorage.setItem("countId", JSON.stringify(fData.countId))
    }, [fData.userArr, fData.countId])

    const saveData = async (e) => {
        if (e.target.type === "checkbox") {
            fData.userObj[e.target.name] = fData.userObj[e.target.name] ?? []
            fData.blankObj[e.target.name] = []
            if (e.target.checked) {
                fData.userObj[e.target.name] = [
                    ...fData.userObj[e.target.name],
                    e.target.value,
                ]
            } else {
                fData.userObj[e.target.name] = fData.userObj[
                    e.target.name
                ]?.filter((x) => x !== e.target.value)
            }
        } else if (e.target.type === "file") {
            fData.userObj[e.target.name] = await toBase64(e.target.files[0])
            fData.blankObj[e.target.name] = ""
        } else {
            fData.userObj[e.target.name] = e.target.value
            fData.blankObj[e.target.name] = ""
        }
        fData.setuserObj({ ...fData.userObj })
        fData.setblankObj({ ...fData.blankObj })
    }

    const submitData = () => {
        if (fData.userObj.id === undefined) {
            fData.countId++
            fData.setcountId(fData.countId)
            fData.userObj.id = fData.countId
            fData.userArr.push(fData.userObj)
            // localStorage.setItem("countID", JSON.stringify(countId))
        } else {
            let index = fData.userArr.findIndex(
                (x) => x.id === fData.userObj.id
            )
            fData.userArr.splice(index, 1, fData.userObj)
        }
        localStorage.setItem("userArr", JSON.stringify(fData.userArr))
        fData.setuserArr([...fData.userArr])
        fData.setuserObj({ ...fData.blankObj })
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your data has been saved",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })

    return (
        <>
            <div className="form w-50 mx-auto shadow p-2">
                <h2 className="m-2 fs-2">Api Crud</h2>
                <Box
                    component=""
                    sx={{
                        "& .MuiTextField-root": {
                            color: "red",
                            m: 1,
                            width: "19.7rem",
                        },
                    }}
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField
                            label="First Name"
                            name="firstName"
                            type="text"
                            value={fData.userObj.firstName ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={fData.userObj.lastName ?? ""}
                            onChange={saveData}
                        />
                        <TextField
                            label="Age"
                            name="age"
                            value={fData.userObj.age ?? ""}
                            type="number"
                            onChange={saveData}
                        />
                        <TextField
                            label="City"
                            name="city"
                            type="text"
                            value={fData.userObj.city ?? ""}
                            onChange={saveData}
                        />
                        <Form.Label className="ms-2 d-block">Gender</Form.Label>
                        <Form.Check
                            className="ms-2 d-inline-block me-2"
                            type="radio"
                            name="gender"
                            label="Male"
                            checked={fData.userObj.gender === "male"}
                            onChange={saveData}
                            value={"male"}
                        />
                        <Form.Check
                            className="d-inline-block me-2"
                            type="radio"
                            name="gender"
                            label="Female"
                            checked={fData.userObj.gender === "female"}
                            onChange={saveData}
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
                                fData.userObj.hobbies?.includes("Traveling") ===
                                true
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
                                fData.userObj.hobbies?.includes("Gaming") ===
                                true
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
                                fData.userObj.hobbies?.includes("Coding") ===
                                true
                            }
                            onChange={saveData}
                            label="Coding"
                            value="Coding"
                        />
                        <br />
                        <TextField
                            className=" my-3"
                            name="image"
                            type="file"
                            onChange={saveData}
                        />
                        <br />
                        <img
                            className="ms-2 my-2  rounded-circle"
                            src={fData.userObj.image}
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
                            onClick={submitData}>
                            Submit
                        </Button>
                        <Link to="/TableApiCrud">
                            <Button
                                sx={{ margin: "5px" }}
                                variant="contained"
                                color="secondary">
                                Table Data
                            </Button>
                        </Link>
                    </div>
                </Box>
            </div>
        </>
    )
}
