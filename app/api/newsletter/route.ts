import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = '2025-01';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CUSTOMER_CREATE = `
  mutation NewsletterCustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

async function storefrontFetch<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
      return NextResponse.json(
        { error: 'Configuration Shopify manquante' },
        { status: 500 }
      );
    }

    const password = randomBytes(24).toString('base64url');

    const data = await storefrontFetch<{
      customerCreate: {
        customer: { id: string; email: string; acceptsMarketing: boolean } | null;
        customerUserErrors: { field: string[]; message: string; code: string }[];
      };
    }>(CUSTOMER_CREATE, {
      input: {
        email,
        password,
        acceptsMarketing: true,
      },
    });

    const errs = data.customerCreate.customerUserErrors;

    if (errs.length) {
      const taken = errs.find((e) => e.code === 'CUSTOMER_DISABLED' || e.code === 'TAKEN');
      if (taken) {
        return NextResponse.json({ success: true, alreadySubscribed: true });
      }
      return NextResponse.json({ error: errs[0].message }, { status: 400 });
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    console.error('[newsletter route]', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}
