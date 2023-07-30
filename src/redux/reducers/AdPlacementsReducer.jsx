
import produce from 'immer'

const AdPlacementsState = {
    list: [],
    isDisable: [],
}

const AdPlacementsReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-AD_PLACEMENTS': state.list = action.payload;
            break;
        default:
            break;
    }
}, AdPlacementsState)

export default AdPlacementsReducer
