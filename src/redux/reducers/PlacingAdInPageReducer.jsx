import produce from 'immer'

const PlacingAdInPageState = {
    list: []
}

const PlacingAdInPageReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-PLACING_AD_IN_PAGE': state.list.push(action.payload);
            break;
        case 'SET-PLACING_AD_IN_PAGE': state.list = action.payload;
            break;
        default:
            break;
    }
}, PlacingAdInPageState)

export default PlacingAdInPageReducer