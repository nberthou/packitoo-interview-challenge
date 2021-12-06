import { CREATE_BRIEF } from "../actions/types";


const initialState = { newBrief: {}, items: []};

export default function(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_BRIEF:
            return {...state, newBrief: action.payload }
        default:
            return state;
    }
}
