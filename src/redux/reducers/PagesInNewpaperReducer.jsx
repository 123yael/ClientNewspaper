import produce from 'immer'

const PagesInNewspaperState = {
    list: []
}

const PagesInNewspaperReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-PAGES_IN_NEWSPAPER': state.list.push(action.payload);
            break;
        case 'SET-PAGES_IN_NEWSPAPER': state.list = action.payload;
            break;
        default:
            break;
    }
}, PagesInNewspaperState)

export default PagesInNewspaperReducer