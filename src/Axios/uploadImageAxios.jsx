
import axios from "axios"
import { SERVER_NAME } from '../config';

let path = `${SERVER_NAME}/api`

// פונקציה להוספת קובץ לשרת
export const handleImageUpload = (event) => {

    const formData = new FormData();

    formData.append('image', event);

    return axios.post(`${path}/ImageUpload/uploadImage`, formData)
};