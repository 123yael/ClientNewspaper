import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getAllAdSizes = () => {
    return axios.get(`${path}/AdSize/GetAllAdSize`)
}

export const addNewAdSize = (newCategory) => {
    return axios.put(`${path}/AdSize/AddNewCategory`, newCategory)
}

export const deleteAdSize = (id) => {
    return axios.delete(`${path}/AdSize/DeleteCategory/${id}`)
}

export const updateAdSize = (id, newCategory) => {
    return axios.post(`${path}/AdSize/UpdateCategory/${id}`, newCategory)
}