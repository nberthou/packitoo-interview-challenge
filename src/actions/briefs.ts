import axios from "axios";
import { call, put, takeLatest } from 'redux-saga/effects';
import {CREATE_ASYNC_BRIEF, CREATE_BRIEF, FETCHING_ERROR} from "./types";


function* createBrief(action: any): any {
    try {
        const response = yield call(axios.post, 'http://localhost:3001/briefs', action.payload);
        yield put({type: CREATE_BRIEF, payload: {...action.payload, id: response.data.id}})
    } catch (error) {
        yield put({type: FETCHING_ERROR, error});
    }
}

export function* watchCreateBrief() {
    yield takeLatest(CREATE_ASYNC_BRIEF, createBrief);
}
