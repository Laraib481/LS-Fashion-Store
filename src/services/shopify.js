const SHOPIFY_DOMAIN = 'ls-fashion-store-bpjcvjts.myshopify.com';
const STOREFRONT_TOKEN = 'a38c0930298ff2a1c042e9c801f68581';
const SHOPIFY_STORE_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

// 1. Fetch All Products
export const fetchShopifyProducts = async () => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_STORE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    if (data.errors) return [];

    return data.data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      currency: node.priceRange.minVariantPrice.currencyCode,
      image: node.images.edges[0]?.node.url || '',
    }));
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

// 2. Fetch Collection Products
export const fetchCollectionProducts = async (handle = 'heels') => {
  const query = `
    {
      collection(handle: "${handle}") {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_STORE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const productsList = data?.data?.collection?.products?.edges || [];

    return productsList.map(({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      currency: node.priceRange.minVariantPrice.currencyCode,
      image: node.images.edges[0]?.node.url || '',
    }));
  } catch (error) {
    console.error('Collection Fetch Error:', error);
    return [];
  }
};

// 3. Fetch Single Product (by Handle or ID)
export const fetchProductByHandleOrId = async (param) => {
  const isGid = param.startsWith('gid://');

  const query = isGid ? `
    query getProductById($id: ID!) {
      node(id: $id) {
        ... on Product {
          id
          title
          handle
          description
          descriptionHtml
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 10) {
            edges { node { id title availableForSale price { amount currencyCode } } }
          }
        }
      }
    }
  ` : `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 5) { edges { node { url altText } } }
        variants(first: 10) {
          edges { node { id title availableForSale price { amount currencyCode } } }
        }
      }
    }
  `;

  try {
    const response = await fetch(SHOPIFY_STORE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: isGid ? { id: param } : { handle: param },
      }),
    });

    const json = await response.json();
    const product = isGid ? json?.data?.node : json?.data?.product;

    if (!product) return null;

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      price: parseFloat(product.priceRange?.minVariantPrice?.amount || 0),
      currency: product.priceRange?.minVariantPrice?.currencyCode || 'PKR',
      images: product.images?.edges?.map(e => e.node.url) || [],
      variants: product.variants?.edges?.map(e => ({
        id: e.node.id,
        title: e.node.title,
        available: e.node.availableForSale,
        price: parseFloat(e.node.price?.amount || 0),
      })) || [],
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

// Backwards compatibility alias
export const fetchProductById = fetchProductByHandleOrId;