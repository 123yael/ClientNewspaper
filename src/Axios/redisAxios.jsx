import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const registerForTheNewsletter = (email) => {
    return axios.post(`${path}/Redis/SetValue/${email}/${true}`)
}