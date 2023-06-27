import { ProductInterface } from '@/types';

export async function fetchAllProducts() {
  const res = await fetch(`${process.env.API_URL}/products`);
  const data: { data: ProductInterface[]; error?: string } = await res.json();

  return data;
}

export async function fetchProduct(slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}`);
  const data: { data: ProductInterface; error?: string } = await res.json();

  return data;
}
