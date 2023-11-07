import axios from "axios"

export const getTokenApiData = () => {
    let auth = {
        Headers: {
            Authorization:
                "Bearer ed0a440f1e51f5eebf75683cc985b20095a49dfb7cd7330d3ae0142c49016abc",
        },
    }

    axios
        .get("https://gorest.co.in/public/v2/users", auth)
        .then((response) => {
            // console.log(response.data)
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
}
