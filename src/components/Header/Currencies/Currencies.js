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

  constructor(props) {
    super(props);
    this.state = {
      menuActive: false
    }
  }

  render(){

    const { currency, setCurrency,  } = this.props;

    return (
      <Query query={GET_CURRENCIES}>
        {
          ({ loading, error, data }) => {
            if(loading) return <h4>Loading...</h4>
            if(error) console.log(error)
          
            return (
              <div className="currencies" >

                <span onClick={() => { this.setState((state) => ({ menuActive: !state.menuActive })) }}>
                  {currency}
                </span>
      
                <ul className={this.state.menuActive ? 'active' : undefined} >
                  {
                    data.currencies.map((currency, index) => (
                        <li 
                          key={index} 
                          onClick={() => {
                            setCurrency(currency)
                            this.setState((state) => ({ menuActive: false }))
                          }} >
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