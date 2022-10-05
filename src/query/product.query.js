import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
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
