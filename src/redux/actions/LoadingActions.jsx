export const startLoading = (value) => {
    return { type: 'START-LOADING', payload: value }
}

export const stopLoading = (value) => {
    return { type: 'STOP-LOADING', payload: value }
}