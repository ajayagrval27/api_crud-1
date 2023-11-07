import React, { useContext, useEffect, useState } from "react"
import { ApiFormData } from "../../App"
import { Link, useParams } from "react-router-dom"
import { apiData } from "../ApiContext"
import { Button } from "@mui/material"

export const ApiUsersDy = () => {
    let gformData = useContext(ApiFormData)
    
    const [uObj, setuObj] = useState({})
    const params = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setuObj(gformData.userArr?.find((x) => x._id === params.userId))
    }, [gformData.userArr])

    const getData = async () => {
        let a = await apiData()
        gformData.setUserArr([...a])
    }

    return (
        <>
            <Link to="/ApiTableDy">
                <Button className="my-3" variant="contained" color="primary">Back To Table Data</Button>
            </Link>

            <h1>User Profile</h1>
            <h2>First Name : {uObj?.firstName}</h2>
            <h2>Last Name : {uObj?.lastName}</h2>
            <h2>Age : {uObj?.age}</h2>
            <h2>Gender : {uObj?.gender}</h2>
            <h2>Hobbies : {uObj?.hobbies?.join(",")}</h2>
            <h2>City : {uObj?.city}</h2>
        </>
    )
}
