import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addItem, removeItem, updateQuantity, decreaseQuantity } from "./CartSlice"
import "./CartItem.css"
import ProductList from "./ProductList"

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items)
  console.log("cart:", cart)
  const [showCart, setShowCart] = useState(false)
  const [showPlants, setShowPlants] = useState(false) // State to control the visibility of the About Us page

  const dispatch = useDispatch()

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0
    let cost = 0
    // console.log("Iterating through cart...")
    cart.forEach(item => {
      // remove dollar sign from cost
      cost = item.cost.substring(1)
      totalAmount += cost * item.quantity
    })

    return totalAmount
  }

  const handleContinueShopping = e => {
    e.preventDefault()
    setShowPlants(true) // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false) // Hide the cart when navigating to About Us
    onContinueShopping(e)
  }

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference")
  }

  const handleIncrement = item => {
    dispatch(addItem(item))
    // console.log("Quantity before increment: ", item.quantity)
    let incrementedQuantity = item.quantity + 1
    // dispatch(updateQuantity(item.name, incrementedQuantity))
    // TO DO: update cart icon with new quantity
    // updateCart(incrementedQuantity)
    // TO DO: update the number of that plant type
    // updateNoOfPlants(incrementedQuantity)
    // TO DO: update the subtotal
    updateSubtotal(incrementedQuantity)
    // TO DO: update the total cost
    updateTotalCost(incrementedQuantity)
  }

  const handleDecrement = item => {
    // dispatch(removeItem(item))
    console.log("Quantity before decrement: ", item.quantity)
    if (item.quantity > 0) {
      let decrementedQuantity = item.quantity - 1
      console.log("item.name:", item.name)
      console.log("item.quantity:", item.quantity)
      console.log(" decremented quantity:", decrementedQuantity)
      dispatch(decreaseQuantity(item))
      // TO DO: update cart icon with new quantity
      updateCart(decrementedQuantity)
      // TO DO: update the number of that plant type
      updateNoOfPlants(decrementedQuantity)
      // TO DO: update the subtotal
      updateSubtotal(decrementedQuantity)
      // TO DO: update the total cost
      updateTotalCost(decrementedQuantity)
    } else {
      console.log("Removing item:", item.name)
      dispatch(removeItem(item))
    }
  }

  const handleRemove = item => {
    console.log("Removing item: ", item)
    console.log("Cart after removal:", cart)

    dispatch(removeItem(item.name))
    // Implement an event handler to remove the item from the cart.
  }

  // BLOCK: MY FUNCTIONS
  // 1. update cart icon with new quantity
  function updateCart(newQuantity) {
    console.log("Updating cart with new quantity: ", newQuantity)
  }
  // 2. update the number of that plant type
  function updateNoOfPlants(newQuantity) {
    console.log("Updating number of plant types with new quantity: ", newQuantity)
  }
  // 3. update the subtotal
  function updateSubtotal(newQuantity) {
    console.log("Updating subtotal: ", newQuantity)
  }
  // 4. update the total cost
  function updateTotalCost(newQuantity) {
    console.log("Updating total cost: ", newQuantity)
  }
  // END BLOCK: MY FUNCTIONS

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = item => {
    const cost = item.cost.substring(1)
    const totalCost = cost * item.quantity
    // totalCost = item.cost * item.quantity
    console.log(`Total cost of ${item.name} in the cart: ${totalCost}`)
    return totalCost
  }

  let noOfCartItems = 0
  const showNoOfCartItems = items => {
    noOfCartItems = items
    console.log("Number of items:", items)
  }

  // console.log("showNoOfCartItems:", noOfCartItems + item.quantity)

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {/* {noOfCartItems()} */}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                {/* {(noOfCartItems = noOfCartItems + item.quantity)} */}
                {showNoOfCartItems(noOfCartItems + item.quantity)}
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", color: "black" }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={e => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={e => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartItem
