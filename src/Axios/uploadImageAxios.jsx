
import axios from "axios"

let path = 'https://localhost:44305/api'

// פונקציה להוספת קובץ לשרת
export const handleImageUpload = (event) => {

    const formData = new FormData();

    formData.append('image', event);

    return axios.post(`${path}/ImageUpload/uploadImage`, formData)
};