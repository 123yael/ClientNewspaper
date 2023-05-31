import produce from 'immer'

const AdSizeState = {
    list: []
}

const AdSizeReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-ALL-AD_SIZES': state.list = action.payload;
            break;
        default:
            break;
    }
}, AdSizeState)

export default AdSizeReducer