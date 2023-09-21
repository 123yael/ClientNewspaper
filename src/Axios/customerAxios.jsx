import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getIdByCustomer = (cust) => {
    return axios.post(`${path}/Customer/GetIdByCustomer`, cust)
}

export const logIn = (email, pass) => {
    return axios.get(`${path}/Customer/LogIn/${email}/${pass}`)
}

export const signUp = (cust) => {
    return axios.post(`${path}/Customer/SignUp`, cust)
}