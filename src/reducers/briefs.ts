import { CREATE_BRIEF, GET_BRIEFS } from "../actions/types";
import { createSelector } from "reselect";

import {BriefType} from "../Components/BriefList";

const briefSelector = (state: any) => {
    return state.briefs.items
};
const selectedProductSelector = (state: any) => state.products.selected;

export const filteredBriefsSelector = createSelector([briefSelector, selectedProductSelector], (briefs, selectedProduct) => {
   if (!selectedProduct) {
       return briefs;
   } else {
       return briefs.filter((brief: BriefType) => brief.productId === selectedProduct)
   }
})


const initialState = { newBrief: {}, items: []};

export default function reducer(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_BRIEF:
            return {...state, newBrief: action.payload, items: [...state.items, action.payload] }
        case GET_BRIEFS:
            return {...state, items: action.briefs }
        default:
            return state;
    }
}
