
import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getAllOrderDetailsTableByDate = (date, page, itemsPerPage) => {
    return axios.get(`${path}/Table/GetAllOrderDetailsTableByDate/${date}?Page=${page}&ItemsPerPage=${itemsPerPage}`)
}

export const getAllDetailsWordsTableByDate = (date, page, itemsPerPage) => {
    return axios.get(`${path}/Table/GetAllDetailsWordsTableByDate/${date}?Page=${page}&ItemsPerPage=${itemsPerPage}`)
}