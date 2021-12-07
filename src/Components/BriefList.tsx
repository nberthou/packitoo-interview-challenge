import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {GET_ASYNC_BRIEFS, SELECT_ASYNC_PRODUCT} from "../actions/types";
import { filteredBriefsSelector } from "../reducers/briefs";

export type BriefType = {
    id: number;
    title: string;
    comment: string;
    productId: number;
}

export type ProductType = { id: number; name: string };

type BriefListProps = {
    getBriefs: any;
    briefs: Array<BriefType>;
    products: Array<ProductType>;
    selectProduct: any;
    selectedProduct: number | 'null';
}

const BriefList = ({getBriefs, briefs, products, selectProduct, selectedProduct}: BriefListProps) => {
    useEffect(() => {
        getBriefs();
    });

    return <div>
        <h1>List</h1>

        <h2>Select by product</h2>B
        <div>
            <select onChange={e => selectProduct(parseInt(e.target.value, 10))} value={selectedProduct}>
                <option value={'null'}>Select a product</option>
                {products.map(product => (
                    <option value={product.id}>{product.name}</option>
                ))}
            </select>
        </div>
        <br />
        {briefs.length ? (<ul>
            {briefs.map(brief => (
                <li>Title: {brief.title}, comment: {brief.comment},
                    product: {products.find(product => product.id === brief.productId)?.name}</li>
            ))}
        </ul>) : (
            <b>No records found</b>
        )}
    </div>
};

const mapStateToProps = (state: any) => ({
    briefs: filteredBriefsSelector(state),
    products: state.products.items,
    selectedProduct: state.products.selected,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getBriefs: () => dispatch({type: GET_ASYNC_BRIEFS}),
    selectProduct: (payload: any) => dispatch({type: SELECT_ASYNC_PRODUCT, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(BriefList);
