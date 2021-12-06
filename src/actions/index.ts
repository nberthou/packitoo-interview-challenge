import { all } from 'redux-saga/effects';
import { watchGetProducts } from './products'
import { watchCreateBrief } from "./briefs";

export default function* saga() {
    yield all([watchGetProducts(), watchCreateBrief()])
}
