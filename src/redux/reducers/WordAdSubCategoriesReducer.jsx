import produce from 'immer'

const WordAdSubCategoryState = {
    list: []
}

const WordAdSubCategoryReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-WORD_AD_SUB_CATEGORY': state.list.push(action.payload);
            break;
        case 'SET-WORD_AD_SUB_CATEGORIES': state.list = action.payload;
            break;
        default:
            break;
    }
}, WordAdSubCategoryState)

export default WordAdSubCategoryReducer