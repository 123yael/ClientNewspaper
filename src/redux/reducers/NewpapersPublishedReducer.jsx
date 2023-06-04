
import produce from 'immer'

const NewspapersPublishedState = {
    list: []
}

const NewspapersPublishedReducer = produce((state, action) => {
    switch (action.type) {
        case 'SET-NEWAPAPERS_PUBLISHED':
            state.list = action.payload;
            break;
        default:
            break;
    }
}, NewspapersPublishedState)

export default NewspapersPublishedReducer
