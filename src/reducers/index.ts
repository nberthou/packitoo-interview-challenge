import { combineReducers } from "redux";

import products from './products'
import briefs from "./briefs";

export default combineReducers({
    products,
    briefs,
});
