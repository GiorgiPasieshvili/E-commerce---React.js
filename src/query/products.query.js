import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($name: String!) {
    category(input: { title: $name }) {
      name
      products {
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
  }
`;
