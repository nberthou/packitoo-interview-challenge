import axios from "axios";
import { call, put, takeLatest } from 'redux-saga/effects';
import store from "../store";

import { GET_PRODUCTS, GET_ASYNC_PRODUCTS, FETCHING_ERROR } from "./types";

const fetchProducts = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/products'
    });
}

function* getProducts() {
    try {
        // @ts-ignore
        const response = yield call(fetchProducts);
        const products = response.data;
        yield put({type: GET_PRODUCTS, products: [...products]});
    } catch (error) {
        yield put({type: FETCHING_ERROR})
    }
}

export function* watchGetProducts() {
    yield takeLatest(GET_ASYNC_PRODUCTS, getProducts);
}
