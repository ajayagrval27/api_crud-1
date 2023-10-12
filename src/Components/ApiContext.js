import axios from "axios"

export const apiData = async () => {
    return await axios
        .get("https://student-api.mycodelibraries.com/api/student/get")
        .then((response) => {
            return response.data.data.map((item) => {
                item.hobbies = item.hobbies.split(",")
                return item
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
