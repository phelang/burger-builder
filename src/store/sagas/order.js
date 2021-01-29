import { put } from 'redux-saga/effects'
import axios from '../../axios-orders'

import * as actions from '../actions/index'

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())

    try {
        const response = yield axios.post(
            '/orders.json?auth=' + action.token,
            action.orderData
        )
        yield put(
            actions.purchaseBurgerSuccess(response.data.name, action.orderData)
        )
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    const queryParams = yield '?auth=' +
        action.token +
        '&orderBy="userId"&equalTo="' +
        action.userId +
        '"'
    try {
        const res = yield axios.get('/orders.json' + queryParams)

        const fetchedOrders = []
        for (let key in res.data) {
            fetchedOrders.push({ id: key, ...res.data[key] })
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        yield put(actions.fetchOrdersFail(error))
    }
}

export function* deleteOrderSaga(action) {
    yield put(actions.deleteOrderLocalData(action.id))

    try {
        yield axios.delete(
            '/orders/' + action.id + '.json?auth=' + action.token
        )
    } catch (error) {}
}
