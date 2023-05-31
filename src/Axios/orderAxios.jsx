import axios from "axios"

let path = 'https://localhost:44305/api'

export const finishOrderAxios = (fo) => {
    debugger
    return axios.post(`${path}/Order/FinishOrder`, fo)
}