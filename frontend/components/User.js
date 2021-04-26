import { gql, useQuery } from '@apollo/client'

export const CURRENT_USER_QUERY = gql`
query{
  authenticatedItem{
  	... on User {
      id
      email
      name
      cart{
        id
        quantity
        product {
          id
          name
          description
          price
          photo{
            image{
              publicUrlTransformed
            }
          }
        }
      }
      # TODO: Query the cart once we have it
    }
  }
}
`

const useUser = () => {
    const {data} = useQuery(CURRENT_USER_QUERY)
    return data?.authenticatedItem
}

export { useUser }
