import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api/WordAdSubCategories`

export const getAllWordAdSubCategories = () => {
    return axios.get(`${path}/GetAllWordAdSubCategories`)
}
