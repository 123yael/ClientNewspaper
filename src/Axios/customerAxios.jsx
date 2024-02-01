import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const logIn = (email, pass) => {
    return axios.get(`${path}/Customer/LogIn/${email}/${pass}`)
}

export const signUp = (cust, isRegistered) => {
    return axios.post(`${path}/Customer/SignUp/${isRegistered}`, cust)
}

export const isAdimin = (token) => {
    return axios.get(`${path}/Customer/IsAdmin/${token}`)
}