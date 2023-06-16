
import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getAllOrderDetails = () => {
    return axios.get(`${path}/OrderDetails/getAllOrderDetails`)
}