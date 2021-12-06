import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch, } from "redux";
import { Formik } from "formik";

import store from "../store";
import {CREATE_ASYNC_BRIEF, GET_ASYNC_PRODUCTS} from "../actions/types";

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
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" onChange={event => setTitle(event.target.value)} onBlur={handleBlur} value={title} />
                        {errors.title && touched.title && errors.title}
                        <input type="text" name="comment" onChange={event => setComment(event.target.value)} onBlur={handleBlur} value={comment} />
                        {errors.comment && touched.comment && errors.comment}
                        <select name="products" onChange={event => setProductId(parseInt(event.target.value, 10))}>
                            {products?.map(product => (
                                <option value={product.id}>{product.name}</option>
                            ))}
                        </select>
                        <button type="submit">Submit!</button>
                    </form>
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
