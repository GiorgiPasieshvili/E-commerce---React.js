import { Component } from 'react';
import { gql } from "@apollo/client";
import { Query } from '@apollo/client/react/components'
import { withRouter } from "react-router-dom";

import './Details.css'

const GET_PRODUCT = gql`
  query GetProduct($name: String!) {
    product(id: $name) {
      id
      name
      inStock
      gallery
      description
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
    }
  }
`;

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: "",
      selectedOptions: []
    }
  }

  handleOptions = (id, value) => {
    const exist = this.state.selectedOptions.find(option => option.id === id)
    if(exist){
      this.setState((state) => ({ 
        ...state,
        selectedOptions: this.state.selectedOptions.map((x) => x.id === id ? { ...exist, value} : x )
      }))
    } else {
      this.setState((state) => ({ 
        ...state,
        selectedOptions: [ ...this.state.selectedOptions, { id, value } ]
      }))
    }
  }

  handleImage = (image) => {
    this.setState((state) => ({ 
      ...state,
      activeImage: image
    }))
  }

  render(){
    const id = this.props.match.params.id || "";
    const { currency, onAdd } = this.props;

    return (
      <Query query={GET_PRODUCT} variables={ { name: id } } >
        {
          ({ loading, error, data }) => {
            if(loading) return <h4>Loading...</h4>
            if(error) console.log(error)
            const { product } = data
            
            return (
              <div className="details container">
        
                <div className="images">
                  <div className="others">
                    {
                    product.gallery.map((image, index) => (
                      <img 
                        onClick={() => this.handleImage(image)} 
                        src={image} 
                        alt={product.name} 
                        key={index} 
                      />
                    ))
                    }
                  </div>
                  <img className="default" src={this.state.activeImage || product.gallery[0]} alt={product.name} />
                </div>

                <div className="info">
                  <h3>{product.brand}</h3>
                  <h2>{product.name}</h2>
        
                  {
                    product.attributes.map((attribute) => (
                      <div className="attribute" key={attribute.id}>
                        <span className="heading">{attribute.name}:</span>
                        <ul className="options">
                          { attribute.items.map((item) => {
                              const selectedItem = this.state.selectedOptions.find(option => option.id === attribute.id && option.value === item.value)
                              return (
                                attribute.type === "swatch" ? (
                                  <li 
                                    style={{background: item.value}} 
                                    onClick={() => this.handleOptions(attribute.id, item.value)} 
                                    className={selectedItem ? 'swatch-active' : undefined}
                                    key={item.id}
                                  ></li>
                                ) : (
                                  <li 
                                    className={selectedItem ? 'active' : undefined }
                                    onClick={() => this.handleOptions(attribute.id, item.value)} 
                                    key={item.id}
                                  > 
                                  {item.value}
                                  </li>
                            ))})}
                        </ul>
                      </div>
                    ))
                  }

                  <span className="heading">price:</span>
                  <span className="amount">{product.prices.find(price => price.currency === currency).amount} {currency}</span>
        
                  <button 
                    className={`btn btn-${product.inStock ? 'green' : 'red'}`}
                    onClick={() => {
                      if (product.inStock) {
                        onAdd(product, this.state.selectedOptions)
                        this.setState((state) => ({ 
                          ...state,
                          selectedOptions: []
                        }))
                      }
                    }}
                  >
                    {product.inStock ? 'add to cart' : 'out of stock'}
                  </button>

                  <div className="description" dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              </div>
              )
          }
        }
      </Query>
    )
  }
}

export default withRouter(Details)