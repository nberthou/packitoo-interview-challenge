import {GET_PRODUCTS, SELECT_PRODUCT} from "../actions/types";

const initialState = { items: [], selected: null };

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case GET_PRODUCTS:
            return { ...state, items: action.products };
        case SELECT_PRODUCT:
            return { ...state, selected: action.payload.id}
        default:
            return state;
    }
}
