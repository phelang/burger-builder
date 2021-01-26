import React from 'react'
import classes from './Order.css'
import Button from '../../components/UI/Button/Button'

const order = (props) => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        })
    }
    const ingredientOutput = ingredients.map((ig) => {
        return (
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}
                key={ig.name}
            >
                {ig.name} {ig.amount}
            </span>
        )
    })

    const contactData = (
        <div className={classes.Order}>
            <p>Contact: {props.contactData.name}</p>
            <p>{props.contactData.country}</p>
            <p>{props.contactData.deliveryMethod}</p>
            <p>{props.contactData.email}</p>
            <p>{props.contactData.street}</p>
            <p>{props.contactData.zipCode} </p>
        </div>
    )
    return (
        <div className={classes.Order}>
            {contactData}
            <p>Ingredients: {ingredientOutput}</p>
            <p>
                Price: <strong>USD {props.price}</strong>
            </p>
            <Button btnType='Delete' clicked={props.deleteOrder}>
                Delete
            </Button>
        </div>
    )
}

export default order
