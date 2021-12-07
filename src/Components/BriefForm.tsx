import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Formik } from "formik";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import {CREATE_ASYNC_BRIEF, GET_ASYNC_PRODUCTS} from "../actions/types";
import { ProductType } from "./BriefList";

type BriefFormProps = {
    getProducts: any;
    products: Array<{id: number; name: string }>;
    createBrief: any;
}

const BriefForm = ({getProducts, products, createBrief}: BriefFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [productId, setProductId] = useState<number>(1);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1>Brief form</h1>
            <Formik initialValues={{title, comment, productId}} onSubmit={(values, {setSubmitting}) => {
                createBrief({title, comment, productId})
                setSubmitting(false);
            }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <FormControl>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField variant="standard" label="Title" type="text" name="title" onChange={event => setTitle(event.target.value)} onBlur={handleBlur} value={title} />
                            {((errors.title && touched.title) || title.length) && errors.title}
                        </div>
                        <br/>
                        <div>
                            <TextField variant="standard" label="Comment" type="text" name="comment" onChange={event => setComment(event.target.value)} onBlur={handleBlur} value={comment} />
                            {((errors.comment && touched.comment) || comment.length) && errors.comment}
                        </div>
                        <br/>
                        <div>
                            <Select defaultValue={1} labelId="add-product-select-label" id="add-product-select" onChange={(event: any) => setProductId(parseInt(event.target.value, 10))}>
                                {products?.map((product: ProductType) => (
                                    <MenuItem value={product.id?.toString()}>{product.name}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <br/>
                        <Button color="success" variant="contained" type="submit">Submit!</Button>
                    </form>
                    </FormControl>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    products: state.products.items
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getProducts: () => dispatch({type: GET_ASYNC_PRODUCTS}),
    createBrief: (payload: any) => dispatch({type: CREATE_ASYNC_BRIEF, payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(BriefForm);
