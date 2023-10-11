export const addMessage = (value) => {
    return { type: 'ADD-MESSAGE', payload: value }
}

export const createConnection = (value) => {
    return { type: 'CREATE-CONNECTION', payload: value }
}