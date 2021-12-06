import { GET_PRODUCTS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action: any) {
    switch(action.type) {
        case GET_PRODUCTS:
            return { ...state, items: action.products };
        default:
            return state;
    }
}
