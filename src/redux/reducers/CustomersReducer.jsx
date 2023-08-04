import produce from 'immer'

const CustomersState = {
    isExistsCustomer: {},
}

const CustomersReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-IS-EXISTS-CUSTOMER': state.isExistsCustomer = {...action.payload};
            break;
        default:
            break;
    }
}, CustomersState)

export default CustomersReducer
