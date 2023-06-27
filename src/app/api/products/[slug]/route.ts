import { products } from '@/data/api_data';
import { ProductInterface } from '@/types';
import { getLastRoute } from '@/helpers/api_helpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);

  const slug = getLastRoute(url.pathname);

  const product = products.find((product) => product.slug === slug);

  if (!product) {
    return NextResponse.json({ error: `Product ${slug} not found!` });
  }

  const data: ProductInterface = {
    category: product.category,
    image: product.image,
    new: product.new,
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    id: product.id,
    features: product.features,
    includes: product.includes,
    gallery: product.gallery,
    others: product.others,
  };

  return NextResponse.json({ data });
}
