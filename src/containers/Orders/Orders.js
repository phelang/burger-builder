import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

const orders = (props) => {
    const { onFetchOrders } = props
    useEffect(() => {
        onFetchOrders(props.token, props.userId)
    }, [onFetchOrders])

    let orders = <Spinner />
    if (!props.loading) {
        orders = props.orders.map((order) => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                contactData={order.orderData}
                price={order.price}
                id={order.id}
                deleteOrder={() => {
                    props.onRemoveOrder(order.id, props.token)
                }}
            />
        ))
    }

    return <div>{orders}</div>
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId)),
        onRemoveOrder: (id, token) => dispatch(actions.deleteOrder(id, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(orders, axios))
