import gql from 'graphql-tag'
export const CREATE_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(
      data: {
        name: $name
        email: $email
        password: $password
        avatar: "https://api.lorem.space/image/face?w=150&h=220"
      }
    ) {
      id
      name
      avatar
    }
  }
`
