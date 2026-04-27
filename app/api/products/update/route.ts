import { NextRequest, NextResponse } from 'next/server';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = process.env.NEXT_SHOPIFY_SECRET;
const API_VERSION = '2025-01';

async function adminFetch(query: string, variables?: Record<string, unknown>) {
  const response = await fetch(
    `https://${STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
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
    throw new Error(JSON.stringify(data.errors));
  }
  return data.data;
}

export async function POST(request: NextRequest) {
  try {
    const updates = await request.json();

    const results = [];

    for (const update of updates) {
      const query = `
        mutation UpdateProduct($input: ProductInput!) {
          productUpdate(input: $input) {
            product {
              id
              title
              handle
              descriptionHtml
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const data = await adminFetch(query, {
        input: {
          id: update.id,
          title: update.title,
          descriptionHtml: update.description,
        },
      });

      results.push(data.productUpdate);
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
