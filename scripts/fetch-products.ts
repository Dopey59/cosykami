#!/usr/bin/env node
import 'dotenv/config';

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2025-01';

async function fetch_products() {
  const query = `
    query Collection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        title
        products(first: $first, sortKey: CREATED, reverse: true) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN!,
      },
      body: JSON.stringify({
        query,
        variables: { handle: 'stickers-cosy', first: 50 },
      }),
    }
  );

  const data = await response.json();
  if (data.errors) {
    console.error('Error:', data.errors);
    return;
  }

  const collection = data.data.collection;
  console.log(`\n📦 ${collection.title}\n`);
  console.log('Recently added products (sorted by creation date):\n');

  collection.products.edges.slice(0, 10).forEach((edge: any, i: number) => {
    const p = edge.node;
    console.log(`${i + 1}. ${p.title}`);
    console.log(`   Handle: ${p.handle}`);
    if (p.description) {
      console.log(`   Description: ${p.description.substring(0, 100)}${p.description.length > 100 ? '...' : ''}`);
    } else {
      console.log(`   Description: (empty)`);
    }
    console.log();
  });
}

fetch_products().catch(console.error);
