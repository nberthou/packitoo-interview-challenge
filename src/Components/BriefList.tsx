import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {GET_ASYNC_BRIEFS} from "../actions/types";

type BriefListProps = {
    getBriefs: any;
    briefs: Array<{id: number; title: string; comment: string; productId: number}>
    products: Array<{id: number; name: string;}>
}

const BriefList = ({getBriefs, briefs, products}: BriefListProps) => {
    useEffect(() => {
        getBriefs();
    }, [])
    return <div>
        <h1>List</h1>
        <ul>
            {briefs.map(brief => (
                <li>Title: {brief.title}, comment: {brief.comment}, product: {products.find(product => product.id === brief.productId)?.name}</li>
            ))}
        </ul>
    </div>
};

const mapStateToProps = (state: any) => ({
    briefs: state.briefs.items,
    products: state.products.items,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getBriefs: () => dispatch({type: GET_ASYNC_BRIEFS}),
});

export default connect(mapStateToProps, mapDispatchToProps)(BriefList);
