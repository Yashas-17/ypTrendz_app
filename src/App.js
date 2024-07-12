import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import Contact from './components/Contact'
import Checkout from './components/Checkout'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    const savedCartList = localStorage.getItem('cartList')
    if (savedCartList) {
      this.setState({cartList: JSON.parse(savedCartList)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {cartList} = this.state
    if (prevState.cartList !== cartList) {
      localStorage.setItem('cartList', JSON.stringify(cartList))
    }
  }

  addCartItem = product => {
    this.setState(prevState => {
      const doesItemExists = prevState.cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (doesItemExists) {
        return {
          cartList: prevState.cartList.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + product.quantity}
              : item,
          ),
        }
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(eachItem => {
          if (eachItem.id === id) {
            if (eachItem.quantity > 1) {
              return {...eachItem, quantity: eachItem.quantity - 1}
            }
            return null
          }
          return eachItem
        })
        .filter(each => each !== null),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <Route
            exact
            path="/products/:id"
            render={props => (
              <ProductItemDetails key={props.match.params.id} {...props} />
            )}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/contact" component={Contact} />
          <ProtectedRoute exact path="/checkout" component={Checkout} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
