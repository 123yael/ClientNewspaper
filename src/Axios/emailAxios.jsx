import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const sentEmail = (name, email, message, subject) => {
    if (name === "")
        name = "User"
    if (subject === "")
        subject = "from: " + email
    return axios.get(`${path}/Email/SentEmail/${name}/${email}/${message}/${subject}`)
}