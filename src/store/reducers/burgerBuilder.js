import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'
import { INGREDIENT_PRICES } from '../IngredientPrices'

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false,
}

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    }
    const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
    )

    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updateState)
}

const removeIngredient = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updateDecrementState = {
        updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updateDecrementState)
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 0,
        error: false,
        building: false,
    })
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state)
        default:
            return state
    }
}

export default reducer
