import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getAllNewspapersPublished = () => {
    return axios.get(`${path}/NewspapersPublished/GetAllNewspapersPublished`)
}

export const getAllAdSizes = () => {
    return axios.get(`${path}/AdSize/GetAllAdSize`)
}