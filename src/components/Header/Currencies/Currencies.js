import { gql } from "@apollo/client";
import { Query } from '@apollo/client/react/components'
import { Component } from 'react';
import './Currencies.css'

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies
  }
`;

export default class Currencies extends Component {
  
  render(){

    const { currency, setCurrency, currencyActive, setCurrencyActive, setMinicartActive } = this.props;

    return (
      <Query query={GET_CURRENCIES}>
        {
          ({ loading, error, data }) => {
            if(loading) return <h4>Loading...</h4>
            if(error) console.log(error)
          
            return (
              <div className="currencies" >

                <span onClick={() => {
                  setMinicartActive(false)
                  setCurrencyActive(!currencyActive)
                }}>
                <i className={`fa fa-${currency === 'AUD' ? 'usd' : currency.toLowerCase()}`}></i>
                </span>
      
                <ul className={currencyActive ? 'active' : undefined} >
                  {
                    data.currencies.map((currency, index) => (
                        <li 
                          key={index} 
                          onClick={() => {
                            setCurrency(currency)
                            setCurrencyActive(false)
                          }} >
                          <i className={`fa fa-${currency === 'AUD' ? 'usd' : currency.toLowerCase()}`}></i>
                          {currency}
                        </li>
                    ))
                  }
                </ul>
                
              </div>
            )
          }
        }
      </Query>
    )
  }
}