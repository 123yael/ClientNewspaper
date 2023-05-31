import axios from "axios"

let path = 'https://localhost:44305/api/WordAdSubCategories'

export const getAllWordAdSubCategories = () => {
    return axios.get(`${path}/GetAllWordAdSubCategories`)
}
