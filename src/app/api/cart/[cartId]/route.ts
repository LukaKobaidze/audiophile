import { productsData } from '@/data/products';
import { CartProductInterface } from '@/types';
import { getLastRoute } from '@/helpers/api_helpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cartId = getLastRoute(url.pathname);

  const product = productsData.find((product) => product.id === Number(cartId));

  if (!product) {
    return NextResponse.json({ error: `Product with an ID ${cartId} not found!` });
  }

  const data: CartProductInterface = {
    name: product.name.split(' ').slice(0, -1).join(' '),
    price: product.price,
    image: product.cartImage,
    slug: product.slug,
  };

  return NextResponse.json({ data });
}
