
import {combineReducers} from "redux"
import { createStore } from "redux";
import WordAdSubCategoryReducer from "./reducers/WordAdSubCategoriesReducer";
import PlacingAdInPageReducer from "./reducers/PlacingAdInPageReducer"
//import PagesInNewspaperReducer from "./reducers/PagesInNewspaperReducer"
import OrdersReducer from "./reducers/OrdersReducer"
import OrderDetailsReducer from "./reducers/OrderDetailsReducer"
import NewspapersPublishedReducer from "./reducers/PlacingAdInPageReducer"
//import DatesForOrdersReducer from "./reducers/DatesForOrdersReducer"
import CustomersReducer from "./reducers/CustomersReducer"
import AdSizeReducer from "./reducers/AdSizeReducer"
import AdPlacementsReducer from "./reducers/AdPlacementsReducer"
import AdCategoriesReducer from "./reducers/AdCategoriesReducer"


export const centralReducer=combineReducers({
    WordAdSubCategoryReducer,
    PlacingAdInPageReducer,
    //PagesInNewspaperReducer,
    OrdersReducer,
    OrderDetailsReducer,
    NewspapersPublishedReducer,
    //DatesForOrdersReducer,
    CustomersReducer,
    AdSizeReducer,
    AdPlacementsReducer,
    AdCategoriesReducer
})

export const localStore=createStore(centralReducer)

window.store=localStore

export default localStore