import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getIdByCustomer = (cust) => {
    return axios.post(`${path}/Customer/GetIdByCustomer`, cust)
}

export const isCustomerExists = (email, pass) => {
    return axios.get(`${path}/Customer/IsCustomerExists/${email}/${pass}`)
}