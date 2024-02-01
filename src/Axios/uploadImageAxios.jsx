
import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

export const handleImageUpload = (event, name) => {

    const formData = new FormData();

    formData.append('image', event, name);

    return axios.post(`${path}/ImageUpload/uploadImage`, formData)
};