import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const sentEmail = (name, email, message, subject, phone) => {
    debugger
    if (name === "")
        name = "User"
    if (subject === "")
        subject = "from: " + email
    if (phone === "")
        phone = "number"
    return axios.get(`${path}/Email/SentEmail/${name}/${email}/${message}/${subject}/${phone}`)
}