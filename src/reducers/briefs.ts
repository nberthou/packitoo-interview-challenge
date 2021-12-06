import { CREATE_BRIEF, GET_BRIEFS } from "../actions/types";


const initialState = { newBrief: {}, items: []};

export default function(state = initialState, action: any) {
    switch(action.type) {
        case CREATE_BRIEF:
            return {...state, newBrief: action.payload, items: [...state.items, action.payload] }
        case GET_BRIEFS:
            return {...state, items: action.briefs }
        default:
            return state;
    }
}
