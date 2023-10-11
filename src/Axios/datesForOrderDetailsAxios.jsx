
import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const updateStatus = (id, status, date, page, itemsPerPage) => {
    return axios.put(`${path}/DateForOrderDetails/UpdateStatus/${id}/${status}/${date}?Page=${page}&ItemsPerPage=${itemsPerPage}`)
}

export const updateStatusWords = (id, status, date, page, itemsPerPage) => {
    return axios.put(`${path}/DateForOrderDetails/UpdateStatusWords/${id}/${status}/${date}?Page=${page}&ItemsPerPage=${itemsPerPage}`)
}

