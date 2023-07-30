import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getAllAdPlacement = () => {
    return axios.get(`${path}/AdPlacement/GetAllAdPlacement`)
}

export const isDisablePlacment = () => {
    return axios.get(`${path}/AdPlacement/IsDisablePlacment`)
}