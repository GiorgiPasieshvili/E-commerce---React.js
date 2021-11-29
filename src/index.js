import { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Header from './components/Header/Header'
import Products from './components/Products/Products';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart'

import './index.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      currency: "USD",
      cartItems: [],
      overlay: false
    }
  }

  setCategory = (category) => {
    this.setState((state) => ({ 
      ...state,
      category: category
    }))
  }

  setCurrency = (currency) => {
    this.setState((state) => ({ 
      ...state,
      currency: currency
    }))
  }

  setCartItems = (products) => {
    this.setState((state) => ({ 
      ...state,
      cartItems: products
    }))
  }

  setOverlay = (boolean) => {
    this.setState((state) => ({ 
      ...state,
      overlay: boolean
    }))
  }

  onAdd = (product, selectedOptions) => {
    const exist = this.state.cartItems.find((x) => x.id === product.id);
    if(exist) {
      if(!selectedOptions) {
        selectedOptions = exist.selectedOptions
      }
      this.setCartItems(
        this.state.cartItems.map((x) => 
          x.id === product.id ? { ...exist, qty: exist.qty + 1, selectedOptions } : x
        )
      )
    } else {
      this.setCartItems([...this.state.cartItems, { ...product, qty: 1, selectedOptions }])
    }
  }

  onRemove = (product) => {
    const exist = this.state.cartItems.find((x) => x.id === product.id);
    if(exist.qty === 1) {
      this.setCartItems(this.state.cartItems.filter((x) => x.id !== product.id));
    } else {
      this.setCartItems(
        this.state.cartItems.map((x) => 
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      )
    }
  }

  onChange = (product, id, value) => {
    this.setCartItems(
      this.state.cartItems.map((x) => 
        x.id === product.id ? { ...product, selectedOptions: [ 
          ...product.selectedOptions.filter(option => option.id !== id), {id, value} 
        ] } : x
      )
    )
  }

  render(){

    return (
      <div>
        <Header 
          category={this.state.category}
          setCategory={this.setCategory} 
          currency={this.state.currency} 
          setCurrency={this.setCurrency} 
          overlay={this.state.overlay}
          setOverlay={this.setOverlay}
          cartItems={this.state.cartItems}
          setCartItem={this.setCartItems}
          onAdd={this.onAdd} 
          onRemove={this.onRemove}
          onChange={this.onChange} 
        />

      <div 
        className={this.state.overlay ? 'overlay' : undefined} 
        onClick={() => this.setOverlay(false)}>
      </div>
        
      <Switch>
        <Route exact path="/" children={<Products currency={this.state.currency} cartItems={this.state.cartItems} />} />
        <Route exact path="/category/:category" children={<Products currency={this.state.currency} cartItems={this.state.cartItems} />} />
        <Route exact path="/product/:id" children={<Details currency={this.state.currency} onAdd={this.onAdd} />} />
        <Route exact path="/cart" children={
          <Cart 
            cartItems={this.state.cartItems} 
            currency={this.state.currency} 
            onAdd={this.onAdd} 
            onRemove={this.onRemove} 
            onChange={this.onChange} 
          />} 
        />
      </Switch>
    </div>
    )
  }
}

render(
  <BrowserRouter>
    <ApolloProvider client={client}>    
      <App />  
    </ApolloProvider>
  </BrowserRouter>,  
  document.getElementById('root'),
);