import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const Checkout = props => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const totalBill = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const confirmOrder = () => {
    removeAllCartItems()
    alert('Order confirmed! Thank you for your purchase.Visit Again...')
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Checkout</h1>
      <div className="order-summary">
        <h2 className="order-summary-heading">Order Summary</h2>
        <table className="order-items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(item => (
              <tr key={item.id} className="order-item">
                <td className="order-item-name">{item.title}</td>
                <td className="order-item-price">Rs {item.price}</td>
                <td className="order-item-quantity">{item.quantity}</td>
                <td className="order-item-total">
                  Rs {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="total-bill">
          Total: <span className="bill-amount">Rs {totalBill} /-</span>
        </h2>
      </div>
      <button
        className="confirm-order-button"
        type="button"
        onClick={confirmOrder}
      >
        Confirm Order
      </button>
    </div>
  )
}

export default Checkout
