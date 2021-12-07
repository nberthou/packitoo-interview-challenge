import axios from "axios";
import { call, put, takeLatest } from 'redux-saga/effects';

import {GET_PRODUCTS, GET_ASYNC_PRODUCTS, FETCHING_ERROR, SELECT_PRODUCT, SELECT_ASYNC_PRODUCT} from "./types";

const fetchProducts = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/products'
    });
}

function* getProducts(): any {
    try {
        const response = yield call(fetchProducts);
        const products = response.data;
        yield put({type: GET_PRODUCTS, products});
    } catch (error) {
        yield put({type: FETCHING_ERROR, error})
    }
}

export function* watchGetProducts() {
    yield takeLatest(GET_ASYNC_PRODUCTS, getProducts);
}

function* selectProduct(action: any): any {
    try {
        yield put({type: SELECT_PRODUCT, payload: {id: action.payload}})
    } catch (error) {
        yield put({type: FETCHING_ERROR, error})
    }
}

export function* watchSelectProducts() {
    yield takeLatest(SELECT_ASYNC_PRODUCT, selectProduct)
}
