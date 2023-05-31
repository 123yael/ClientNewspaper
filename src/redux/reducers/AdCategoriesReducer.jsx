import produce from 'immer'

const AdCategoriesState = {
    list: []
}

const AdCategoriesReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-AD_CATEGORIES': state.list.push(action.payload);
            break;
        case 'SET-AD_CATEGORIES': state.list = action.payload;
            break;
        default:
            break;
    }
}, AdCategoriesState)

export default AdCategoriesReducer