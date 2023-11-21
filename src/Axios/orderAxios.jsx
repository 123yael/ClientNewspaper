import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const finishOrderAxios = (order, token) => {
    return axios.post(`${path}/Order/FinishOrder/${token}`, order)
}

export const finishOrderAdWordsAxios = (order, token) => {
    return axios.post(`${path}/Order/FinishOrderAdWords/${token}`, order)
}

export const calculationOfOrderPrice = (listOrderDetails) => {
    return axios.post(`${path}/Order/CalculationOfOrderPrice`, listOrderDetails)
}

export const calculationOfOrderWordsPrice = (listOrderDetails) => {
    return axios.post(`${path}/Order/CalculationOfOrderWordsPrice`, listOrderDetails)
}