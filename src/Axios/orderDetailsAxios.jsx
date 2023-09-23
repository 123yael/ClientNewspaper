
import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getOrderDetailsByDate = (date, page, itemsPerPage) => {
    return axios.get(`${path}/OrderDetails/GetOrderDetailsByDate/${date}?Page=${page}&ItemsPerPage=${itemsPerPage}`)
}