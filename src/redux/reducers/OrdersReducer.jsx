import produce from 'immer'

const OrdersState = {
    list: [],
    currentOrder: {}
}

const OrdersReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-ORDERS': state.list.push(action.payload);
            break;
        case 'SET-ORDER': state.list = action.payload;
            break;
        default:
            break;
    }
}, OrdersState)

export default OrdersReducer
