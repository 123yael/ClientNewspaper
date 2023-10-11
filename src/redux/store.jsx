import { combineReducers } from "redux"
import { createStore } from "redux";
import WordAdSubCategoryReducer from "./reducers/WordAdSubCategoriesReducer";
import OrdersReducer from "./reducers/OrdersReducer"
import OrderDetailsReducer from "./reducers/OrderDetailsReducer"
import NewspapersPublishedReducer from "./reducers/NewpapersPublishedReducer"
import DatesForOrdersReducer from "./reducers/DateForOrdersReducer"
import CustomersReducer from "./reducers/CustomersReducer"
import AdSizeReducer from "./reducers/AdSizeReducer"
import AdPlacementsReducer from "./reducers/AdPlacementsReducer"
import LoadingReducer from "./reducers/LoadingReducer"
import MessagesReducer from "./reducers/MessagesReducer"

export const centralReducer = combineReducers({
    WordAdSubCategoryReducer,
    OrdersReducer,
    OrderDetailsReducer,
    NewspapersPublishedReducer,
    DatesForOrdersReducer,
    CustomersReducer,
    AdSizeReducer,
    AdPlacementsReducer,
    LoadingReducer,
    MessagesReducer,
})

export const localStore = createStore(centralReducer)

window.store = localStore

export default localStore