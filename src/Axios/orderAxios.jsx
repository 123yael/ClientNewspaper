import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const finishOrderAxios = (fo) => {
    debugger
    return axios.post(`${path}/Order/FinishOrder`, fo)
}