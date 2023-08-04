import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const finishOrderAxios = (order) => {
    return axios.post(`${path}/Order/FinishOrder`, order)
}

export const finishOrderAdWordsAxios = (order) => {
    debugger
    return axios.post(`${path}/Order/FinishOrderAdWords`, order)
}