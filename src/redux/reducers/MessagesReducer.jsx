import produce from 'immer'

const MessagesState = {
    messages: [],
    connection: null
}

const MessagesReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            state.messages = [...state.messages, action.payload];
            break;
        case 'CREATE-CONNECTION':
            state.connection = action.payload
            break;
        default:
            break;
    }
}, MessagesState)

export default MessagesReducer
