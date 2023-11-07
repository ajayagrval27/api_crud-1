import { Button } from "@mui/material"
import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"

export const FormValidation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    let [userArray, setuserArray] = useState([])

    const submitForm = (data) => {
        setuserArray([...userArray, data])
    }
    console.log(userArray);


    // let [blankObj, setblankObj] = useState({})
    // let [userArray, setuserArray] = useState([])

    // let [errors, seterrors] = useState({})

    // const handleChange = (e) => {
    //     userObj[e.target.name] = e.target.value
    //     blankObj[e.target.name] = ""

    //     let errors = {}

    //     if (e.target.name === "firstName") {
    //         if (e.target.value.length === 0) {
    //             errors.firstName = "First Name is required"
    //         } else if (/^[A-Z a-z]+$/.test(e.target.value) === false) {
    //             errors.firstName = "First Name should be only alphabets"
    //         } else if (e.target.value.length < 3) {
    //             errors.firstName = "First Name should be atleast 3 characters"
    //         }
    //         seterrors(errors)
    //     } else if (e.target.name === "lastName") {
    //         if (e.target.value.length === 0) {
    //             errors.lastName = "Last Name is required"
    //         } else if (/^[A-Z a-z]+$/.test(e.target.value) === false) {
    //             errors.lastName = "Last Name should be only alphabets"
    //         } else if (e.target.value.length < 5) {
    //             errors.lastName = "Last Name should be atleast 5 characters"
    //         }
    //         seterrors(errors)
    //     } else if (e.target.name === "email") {
    //         userObj[e.target.value] = e.target.value.endsWith("@outlook.com")

    //         if (e.target.value.length === 0) {
    //             errors.email = "Email is required"
    //         } else if (/^[A-Z a-z]+$/.test(e.target.value) === false) {
    //             errors.email = "Email is invalid"
    //         }
    //         seterrors(errors)
    //     } else if (e.target.name === "age") {
    //         if (e.target.value.length === 0) {
    //             errors.age = "Age is required"
    //         } else if (e.target.value < 18) {
    //             errors.age = "Age should be greater than 18 years"
    //         }
    //         seterrors(errors)
    //     } else if (e.target.name === "contactNo") {
    //         if (e.target.value.length === 0) {
    //             errors.contactNo = "Contact No. is required"
    //         } else if (/^[A-Z a-z]+$/.test(e.target.value) === true) {
    //             errors.contactNo = "Contact No. is invalid"
    //         } else if (e.target.value.length < 10) {
    //             errors.contactNo = "Contact No. should be 10 digits"
    //         }
    //         seterrors(errors)
    //     } else if (e.target.name === "hobbies") {
    //         if(e.target.value.length === 0) {
    //             errors.hobbies = "Hobbies is required"
    //         } else if (e.target.value.length < 3) {
    //             errors.hobbies = "Hobbies should be atleast 3 characters"
    //         }
    //     }

    //     setuserObj({ ...userObj })
    //     setblankObj({ ...blankObj })
    // }

    // const submitForm = () => {
    //     userArray.push(userObj)
    //     setuserArray([...userArray])
    //     setuserObj(blankObj)
    //     seterrors(blankObj)
    // }

    return (
        <div>
            <Form
                onSubmit={handleSubmit(submitForm)}
                action="#"
                style={{ width: "35rem" }}
                className="mx-auto shadow p-3">
                <h2 className="mb-3">Form Validation</h2>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        {...register("firstName", {
                            required: "First Name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "First Name should be atleast 3 characters",
                            },
                            pattern: {
                                value: /^[A-Z a-z]+$/,
                                message: "First Name should be only alphabets",
                            },
                        })}
                        // value={userObj.firstName ?? ""}
                        // onChange={handleInput}
                        placeholder="Enter First Name"
                    />
                    {errors.firstName && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.firstName.message}
                        </p>
                    )}
                    {/* {errors.firstName && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.firstName}
                        </p>
                    )} */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        {...register("lastName", {
                            required: "Last Name is required",
                            minLength: {
                                value: 5,
                                message:
                                    "Last Name should be atleast 5 characters",
                            },
                            pattern: {
                                value: /^[A-Z a-z]+$/,
                                message: "Last Name should be only alphabets",
                            },
                        })}
                        // value={userObj.lastName ?? ""}
                        // onChange={handleInput}
                        placeholder="Enter Last Name"
                    />
                    {errors.lastName && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.lastName.message}
                        </p>
                    )}
                    {/* {errors.lastName && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.lastName}
                        </p>
                    )} */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email is invalid",
                            },
                        })}
                        // value={userObj.email ?? ""}
                        // onChange={handleInput}
                        placeholder="Enter Email"
                    />
                    {errors.email && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.email.message}
                        </p>
                    )}
                    {/* {errors.email && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.email}
                        </p>
                    )} */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        {...register("age", {
                            required: "Age is required",
                            min: {
                                value: 18,
                                message: "Age should be greater than 18 years",
                            },
                        })}
                        // value={userObj.age ?? ""}
                        // onChange={handleInput}
                        placeholder="Enter Age"
                    />
                    {errors.age && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.age.message}
                        </p>
                    )}
                    {/* {errors.age && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.age}
                        </p>
                    )} */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control
                        type="tel"
                        name="contactNo"
                        {...register("contactNo", {
                            required: "Contact No. is required",
                            pattern: {
                                value: /^(\+?\d{1,2}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                                message: "Contact No. is invalid",
                            },
                            minLength: {
                                value: 10,
                                message: "Contact No. should be 10 digits",
                            },
                        })}
                        // value={userObj.contactNo ?? ""}
                        // onChange={handleInput}
                        placeholder="Enter Contact No."
                    />
                    {errors.contactNo && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.contactNo.message}
                        </p>
                    )}
                    {/* {errors.contactNo && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.contactNo}
                        </p>
                    )} */}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="d-block">Gender</Form.Label>
                    <Form.Check
                        className="d-inline-block me-2"
                        type="radio"
                        name="gender"
                        {...register("gender", {
                            required: "Gender is Required",
                        })}
                        // checked={userObj.gender === "Male"}
                        // onChange={saveData}
                        value={"Male"}
                        label="Male"
                    />
                    <Form.Check
                        className="d-inline-block me-2"
                        type="radio"
                        name="gender"
                        {...register("gender", {
                            required: "Gender is Required",
                        })}
                        // checked={userObj.gender === "Female"}
                        // onChange={saveData}
                        label="Female"
                        value={"Female"}
                    />
                    {errors.gender && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.gender.message}
                        </p>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label className="d-block my-2">Hobbies</Form.Label>
                    <Form.Check
                        className="d-inline-block me-2"
                        type="checkbox"
                        name="hobbies"
                        label="Traveling"
                        value="Traveling"
                        // checked={
                        //     userObj.hobbies?.includes("Traveling") === true
                        // }
                        // onChange={saveData}
                        {...register("hobbies", {
                            required: "Hobbies is required",
                        })}
                    />
                    <Form.Check
                        className="d-inline-block me-2"
                        type="checkbox"
                        name="hobbies"
                        label="Gaming"
                        value="Gaming"
                        // checked={userObj.hobbies?.includes("Gaming") === true}
                        // onChange={saveData}
                        {...register("hobbies", {
                            required: "Hobbies is required",
                        })}
                    />
                    <Form.Check
                        className="d-inline-block me-2"
                        type="checkbox"
                        name="hobbies"
                        label="Coding"
                        value="Coding"
                        // checked={userObj.hobbies?.includes("Coding") === true}
                        // onChange={saveData}
                        {...register("hobbies", {
                            required: "Hobbies is required",
                        })}
                    />
                    {errors.hobbies && (
                        <p className="effect text-danger mt-2 ms-1 mb-0">
                            {errors.hobbies.message}
                        </p>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Information</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        style={{ textTransform: "capitalize" }}
                        type="textarea"
                        name="textArea"
                        {...register("textArea", {
                            required: "Information is required",
                        })}
                        // value={userObj.textArea ?? ""}
                        // value={userObj.textArea
                        //     ?.split(" ")
                        //     ?.map(
                        //         (word) =>
                        //             word.charAt(0).toUpperCase() + word.slice(1)
                        //     )
                        //     .join(" ")}
                        // onChange={handleInput}
                        placeholder="Enter Information"
                    />
                </Form.Group>

                <Button
                    // onClick={submitForm}
                    type="submit"
                    value="Submit"
                    className="ms-2"
                    variant="contained">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
