import produce from 'immer'

const CustomersState = {
    customer: {}
}

const CustomersReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'SET-CUSTOMER': state.customer = action.payload;
            break;
        default:
            break;
    }
}, CustomersState)

export default CustomersReducer