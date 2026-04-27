#!/usr/bin/env node
import 'dotenv/config';

const STORE_DOMAIN = 'cosy-kami.myshopify.com';
const ADMIN_TOKEN = process.env.NEXT_SHOPIFY_SECRET;

async function adminFetch(query: string, variables?: Record<string, unknown>) {
  const response = await fetch(
    `https://${STORE_DOMAIN}/admin/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const data = await response.json();
  if (data.errors) {
    console.error('GraphQL Error:', data.errors);
    throw new Error(data.errors[0].message);
  }
  return data.data;
}

async function main() {
  console.log('Fetching stickers-cosy collection products...\n');

  const collectionQuery = `
    query {
      collections(first: 1, query: "title:stickers-cosy") {
        edges {
          node {
            id
            title
            products(first: 50, sortKey: CREATED, reverse: true) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await adminFetch(collectionQuery);
  const collection = result.collections.edges[0]?.node;

  if (!collection) {
    console.log('Collection not found');
    return;
  }

  console.log(`Collection: ${collection.title}\n`);
  console.log('Most recently added products:\n');

  const products = collection.products.edges.slice(0, 5);
  products.forEach((edge: any, i: number) => {
    const product = edge.node;
    console.log(`${i + 1}. ${product.title}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Created: ${product.createdAt}`);
    console.log(`   Current description: ${product.description?.substring(0, 80)}...`);
    console.log();
  });
}

main().catch(console.error);
