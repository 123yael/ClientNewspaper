
import produce from 'immer'

const OrderDetailsState = {
    list: [],
    listDates: [],
    allOrderDetails: []
}

const OrderDetailsReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-ORDER_DETAILS': state.list = [...action.payload];
            break;
        case 'SET-DATES-OF-AD': state.listDates = [...action.payload];
            break;
        case 'SET-ALL-DETAILS': state.allOrderDetails = [...action.payload];
            break;
        default:
            break;
    }
}, OrderDetailsState)

export default OrderDetailsReducer
