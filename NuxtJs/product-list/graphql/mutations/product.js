import gql from 'graphql-tag'

export const CREATE_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $price: Float!
    $categoryId: Float!
    $images: [String!]!
  ) {
    addProduct(
      data: {
        title: $title
        description: $description
        price: $price
        categoryId: $categoryId
        images: $images
      }
    ) {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $title: String!
    $description: String!
    $price: Float!
    $categoryId: Float!
    $images: [String!]!
  ) {
    updateProduct(
      id: $id
      changes: {
        title: $title
        description: $description
        price: $price
        categoryId: $categoryId
        images: $images
      }
    ) {
      id
      title
      description
      price
      images
      category {
        id
        name
        image
      }
    }
  }
`
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`
