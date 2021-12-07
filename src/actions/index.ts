import { all } from 'redux-saga/effects';
import { watchGetProducts, watchSelectProducts } from './products'
import { watchCreateBrief, watchGetBriefs } from "./briefs";

export default function* saga() {
    yield all([watchGetProducts(), watchCreateBrief(), watchGetBriefs(), watchSelectProducts()])
}
