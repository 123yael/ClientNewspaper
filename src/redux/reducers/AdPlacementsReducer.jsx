
import produce from 'immer'

const AdPlacementsState = {
    list: []
}

const AdPlacementsReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-AD_PLACEMENTS': state.list.push(action.payload);
            break;
        case 'SET-AD_PLACEMENTS': state.list = action.payload;
            break;
        default:
            break;
    }
}, AdPlacementsState)

export default AdPlacementsReducer