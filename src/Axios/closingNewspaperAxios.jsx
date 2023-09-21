import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const shabetz = (date) => {
    return axios.get(`${path}/Word/Shabetz/${date}`)
}

export const closingNewspaper = (date, countPages) => {
    return axios.get(`${path}/Word/ClosingNewspaper/${date}/${countPages}`)
}