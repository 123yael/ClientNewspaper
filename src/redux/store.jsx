
import { combineReducers } from "redux"
import { createStore } from "redux";
import WordAdSubCategoryReducer from "./reducers/WordAdSubCategoriesReducer";
import PlacingAdInPageReducer from "./reducers/PlacingAdInPageReducer"
import PagesInNewspaperReducer from "./reducers/PagesInNewpaperReducer"
import OrdersReducer from "./reducers/OrdersReducer"
import OrderDetailsReducer from "./reducers/OrderDetailsReducer"
import NewspapersPublishedReducer from "./reducers/NewpapersPublishedReducer"
import DatesForOrdersReducer from "./reducers/DateForOrdersReducer"
import CustomersReducer from "./reducers/CustomersReducer"
import AdSizeReducer from "./reducers/AdSizeReducer"
import AdPlacementsReducer from "./reducers/AdPlacementsReducer"
import AdCategoriesReducer from "./reducers/AdCategoriesReducer"


export const centralReducer = combineReducers({
    WordAdSubCategoryReducer,
    PlacingAdInPageReducer,
    PagesInNewspaperReducer,
    OrdersReducer,
    OrderDetailsReducer,
    NewspapersPublishedReducer,
    DatesForOrdersReducer,
    CustomersReducer,
    AdSizeReducer,
    AdPlacementsReducer,
    AdCategoriesReducer
})

export const localStore = createStore(centralReducer)

window.store = localStore

export default localStore