import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
        id: action.orderId,
    })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
    })
}

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false })
}
const purchaseOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    })
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const deleteOrderSuccess = (state, action) => {
    const newOrders = state.orders.filter((order) => {
        return order.id !== action.orderId
    })
    return updateObject(state, {
        orders: newOrders,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFailed(state, action)
        case actionTypes.PURCHASE_ORDER_START:
            return purchaseOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrderFail(state, action)
        case actionTypes.DELETE_ORDER_SUCCESS:
            return deleteOrderSuccess(state, action)

        default:
            return state
    }
}

export default reducer
