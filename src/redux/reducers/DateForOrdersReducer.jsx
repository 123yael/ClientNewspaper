import produce from 'immer'

const DatesForOrdersState = {
    list: []
}

const DatesForOrdersReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-DATESFORORDERS': state.list = action.payload;
            break;
        default:
            break;
    }
}, DatesForOrdersState)

export default DatesForOrdersReducer
