
import produce from 'immer'

const OrderDetailsState = {
    list: [],
    listDates: []
}

const OrderDetailsReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'SET-ORDER_DETAILS': state.list = [...action.payload];
            break;
        case 'SET-DATES-OF-AD': state.listDates = [...action.payload];
            break;
        default:
            break;
    }
}, OrderDetailsState)

export default OrderDetailsReducer