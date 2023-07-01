import produce from 'immer'

const CustomersState = {
    customer: {},
    isManager: false
}

const CustomersReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-CUSTOMER': state.customer = {...action.payload};
            break;
        case 'SET-MANAGER': state.isManager = action.payload;
            break;
        default:
            break;
    }
}, CustomersState)

export default CustomersReducer
