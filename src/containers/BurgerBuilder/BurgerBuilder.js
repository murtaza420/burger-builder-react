import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0
        },
        purchasable: false,
        totalPrice: 4
    }

    updatePurchasableState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = type => {
        const updatedCounted = this.state.ingredients[type] + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchasableState(updatedIngredients)
    }

    removeIngredientHandler = type => {
        if (this.state.ingredients[type] <= 0) {
            return
        }
        const updatedCounted = this.state.ingredients[type] - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchasableState(updatedIngredients)
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Auxiliary>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder