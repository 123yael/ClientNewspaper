import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const getAllNewspapersPublished = async (page, itemsPerPage, sheet, date) => {
    if (sheet === "")
        sheet = "0"
    if (date === "")
        date = "0"
    return await axios.get(`${path}/NewspapersPublished/GetAllNewspapersPublished/${sheet}/${date}?Page=${page}&ItemsPerPage=${itemsPerPage}`)
}

export const getAllAdSizes = async () => {
    return await axios.get(`${path}/AdSize/GetAllAdSize`)
}