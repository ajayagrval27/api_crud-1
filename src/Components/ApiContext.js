import axios from "axios"

export const apiData = async () => {
    return await axios
        .get("https://student-api.mycodelibraries.com/api/user/get")
        .then((response) => {
            return response.data.data.map((item) => {
                item.hobbies = item.hobbies.split(",")
                return item
            })
            // return [...response.data.data]
        })
        .catch((error) => {
            console.log(error)
        })
}
