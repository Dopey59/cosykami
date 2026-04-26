export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  seo: { title: string | null; description: string | null };
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  variants: { edges: { node: ShopifyProductVariant }[] };
  images: { edges: { node: ShopifyImage }[] };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  seo: { title: string | null; description: string | null };
  image: ShopifyImage | null;
  products: { edges: { node: ShopifyProduct }[] };
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
  };
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    product: {
      title: string;
      handle: string;
      images: { edges: { node: ShopifyImage }[] };
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: { node: CartLine }[] };
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
};
