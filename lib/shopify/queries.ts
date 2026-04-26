export const COLLECTION_QUERY = `
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        title
        description
      }
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      vendor
      productType
      tags
      availableForSale
      seo {
        title
        description
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
      images(first: 8) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const ALL_COLLECTIONS_QUERY = `
  query AllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  query FeaturedProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_RECOMMENDATIONS_QUERY = `
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;
