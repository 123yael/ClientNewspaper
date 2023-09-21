import produce from 'immer'

const LoadingState = {
    loading: false,
    isExistLoading: 0
}

const LoadingReducer = produce((state, action) => {
    switch (action.type) {
        case 'START-LOADING': {
            state.loading = true;
            state.isExistLoading++;
        }
            break;
        case 'STOP-LOADING': {
            state.isExistLoading--;
            if (state.isExistLoading == 0) {
                state.loading = false;
            }
            state.loading = false;
        }
            break;
        default:
            break;
    }
}, LoadingState)

export default LoadingReducer
