
import produce from 'immer'

const NewspapersPublishedState = {
    list: []
}

const NewspapersPublishedReducer = produce((state, action) => {
    switch (action.type) {
        case 'ADD-TO-NEWAPAPERS_PUBLISHED': state.list.push(action.payload);
            break;
        case 'SET-NEWAPAPERS_PUBLISHED': state.list = action.payload;
            break;
        default:
            break;
    }
}, NewspapersPublishedState)

export default NewspapersPublishedReducer