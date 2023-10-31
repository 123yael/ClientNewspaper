import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const finishOrderAxios = (order, formDataList) => {
    return axios.post(`${path}/Order/FinishOrder`, order)
}

export const finishOrderAdWordsAxios = (order) => {
    return axios.post(`${path}/Order/FinishOrderAdWords`, order)
}

export const calculationOfOrderPrice = (listOrderDetails) => {
    return axios.post(`${path}/Order/CalculationOfOrderPrice`, listOrderDetails)
}