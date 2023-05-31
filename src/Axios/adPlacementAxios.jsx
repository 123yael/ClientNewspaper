import axios from "axios"

let path = 'https://localhost:44305/api'

export const getAllAdPlacement = () => {
    return axios.get(`${path}/AdPlacement/GetAllAdPlacement`)
}