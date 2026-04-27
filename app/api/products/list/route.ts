import { shopifyFetch } from '@/lib/shopify/client';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const query = `
      query Collection($handle: String!, $first: Int!) {
        collection(handle: $handle) {
          title
          products(first: $first) {
            edges {
              node {
                id
                title
                handle
                description
              }
            }
          }
        }
      }
    `;

    const data = await shopifyFetch<{
      collection: {
        title: string;
        products: { edges: { node: ShopifyProduct }[] };
      };
    }>({
      query,
      variables: { handle: 'stickers-cosy', first: 50 },
      cache: 'no-store',
    });

    return NextResponse.json(data.collection.products.edges.map((e) => e.node));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
