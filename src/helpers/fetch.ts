import { ProductInterface } from '@/types';

const apiUrl = 'http://localhost:3000/api';

export async function fetchAllProducts() {
  const res = await fetch(apiUrl + '/products');
  const data: { data: ProductInterface[]; error?: string } = await res.json();

  return data;
}

export async function fetchProduct(slug: string) {
  const res = await fetch(apiUrl + `/products/${slug}`);
  const data: { data: ProductInterface; error?: string } = await res.json();

  return data;
}
