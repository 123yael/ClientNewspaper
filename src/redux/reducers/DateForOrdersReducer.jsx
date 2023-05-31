import produce from 'immer'

const DatesForOrdersState = {
    list: []
}

const DatesForOrdersReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-DATES_FOR_ORDERS': state.list.push(action.payload);
            break;
        case 'SET-DATES_FOR_ORDERS': state.list = action.payload;
            break;
        default:
            break;
    }
}, DatesForOrdersState)

export default DatesForOrdersReducer