import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    let state
    beforeEach(() => {
        state = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }
    })
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(state)
    })

    it('should store the token upon login', () => {
        expect(
            reducer(state, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'some token',
                userId: 'some-user-id',
            })
        ).toEqual({
            token: 'some token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/',
        })
    })
})
