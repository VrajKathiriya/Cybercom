import gql from 'graphql-tag'
export const GET_ALL_BEDS = gql`
  query Listing(
    $page: Int!
    $sortBy: catalogSearchFilterSort!
    $perPage: catalogSearchResultItemPerPage!
    $facet: [catalogSearchFacetInput]
  ) {
    listing {
      listingCategory(
        slug: "bedroom/beds"
        request: {
          page: $page
          perPage: $perPage
          sortBy: $sortBy
          facet: $facet
        }
      ) {
        itemsCount
        items {
          id
          name
          labels
          images {
            mainImage {
              src
            }
            hoverImage {
              src
            }
          }
          brand {
            name
          }
          price {
            finalPrice
            msrp
            showMsrp
            getExcludePromo
            getSale
          }
          tags {
            primaryDealTag
          }
          reviews {
            number
            rating
          }
        }
      }
    }
  }
`
export const GET_ALL_FILTERSBLOCK = gql`
  query Listing(
    $page: Int!
    $sortBy: catalogSearchFilterSort!
    $perPage: catalogSearchResultItemPerPage!
  ) {
    listing {
      listingCategory(
        slug: "bedroom/beds"
        request: { page: $page, perPage: $perPage, sortBy: $sortBy, facet: [] }
      ) {
        itemsCount
        filtersBlock {
          title
          attrCode
          facets {
            itemCount
            attrLabel
            attrValue
          }
        }
      }
    }
  }
`
