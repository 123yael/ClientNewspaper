import axios from "axios"

let path = 'https://localhost:44305/api'

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