import {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = props => {
  const {cartList} = useContext(CartContext)

  const totalBill = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const onCheckout = () => {
    const {history} = props
    history.push('/checkout')
  }

  return (
    <div className="cart-summary-bg-container">
      <h2 className="totalbill-heading">
        Order Total: <span className="bill-amount">Rs {totalBill} /-</span>
      </h2>
      <p className="item-count">{cartList.length} items in cart</p>
      <button className="checkout-button" type="button" onClick={onCheckout}>
        Checkout
      </button>
    </div>
  )
}

export default withRouter(CartSummary)
