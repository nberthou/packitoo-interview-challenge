import axios from "axios";
import { call, put, takeLatest } from 'redux-saga/effects';
import {CREATE_ASYNC_BRIEF, CREATE_BRIEF, FETCHING_ERROR, GET_BRIEFS, GET_ASYNC_BRIEFS} from "./types";


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

const fetchBriefs = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/briefs'
    });
}

function* getBriefs(): any {
    try {
        const response = yield call(fetchBriefs);
        const briefs = response.data;
        yield put({type: GET_BRIEFS, briefs})
    } catch (error) {
        yield put({type: FETCHING_ERROR, error})
    }
}

export function* watchGetBriefs() {
    yield takeLatest(GET_ASYNC_BRIEFS, getBriefs);
}
