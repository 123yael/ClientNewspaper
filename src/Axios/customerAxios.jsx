import axios from "axios"

let path = 'https://localhost:44305/api'

export const getIdByCustomer = (cust) => {
    return axios.post(`${path}/Customer/GetIdByCustomer`, cust)
}

export const isCustomerExists = (email, pass) => {
    return axios.get(`${path}/Customer/IsCustomerExists/${email}/${pass}`)
}