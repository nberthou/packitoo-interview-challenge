import { call, put, takeEvery, all } from 'redux-saga/effects';
import { watchGetProducts } from './products'

export default function* saga() {
    yield all([watchGetProducts()])
}
