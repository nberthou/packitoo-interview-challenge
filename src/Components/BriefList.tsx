import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'

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
    }, []);

    return <div>
        <h1>List</h1>

        <h2>Select by product</h2>
        <div>
            <Select defaultValue="null" onChange={e => selectProduct(parseInt(e.target.value, 10))} value={selectedProduct?.toString()}>
                <MenuItem value="null">Select a product</MenuItem>
                {products.map(product => (
                    <MenuItem value={product.id.toString()}>{product.name}</MenuItem>
                ))}
            </Select>
        </div>
        <br />
        <div style={{width: '100%', display: 'inline-flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {briefs.length ?
                briefs.map(brief => (
                    <Card sx={{ width: 275, height: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {brief.title}
                            </Typography>
                            <Typography variant="body2">
                                {brief.comment}
                            </Typography>
                            <Chip label={products.find(product => product.id === brief.productId)?.name} />
                        </CardContent>
                    </Card>
                ))
             : (
                <b>No records found</b>
            )}
        </div>
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
