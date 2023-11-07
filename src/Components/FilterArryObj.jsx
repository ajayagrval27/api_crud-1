import React from "react"
import { useFilterData } from "./UseFilterData"

export const FilterArryObj = () => {
    let data = [
        {
            name: "AAAA",
            age: 20,
            city: "Pune",
        },
        {
            name: "BBBB",
            age: 21,
            city: "Mumbai",
        },
        {
            name: "CCCC",
            age: 22,
            city: "Delhi",
        },
        {
            name: "DDDD",
            age: 23,
            city: "Pune",
        },
        {
            name: "EEEE",
            age: 24,
            city: "Mumbai",
        },
        {
            name: "FFFF",
            age: 25,
            city: "Delhi",
        },
    ]
    // let html = useFilterData(data)
    let filterObj = useFilterData(data)
    console.log(filterObj)

    return (
        <>
            <h1>Filter Array of Objects</h1>
            {filterObj.map((obj, index) => {
                return (
                    <div key={index}>
                        <h2>Name : {obj.name}</h2>
                        <h2>Age : {obj.age}</h2>
                    </div>
                )
            })}
        </>
    )
}
