import { products } from '@/data/api_data';
import { CategoryProductInterface } from '@/types';
import { getLastRoute } from '@/helpers/api_helpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = getLastRoute(url.pathname);

  const categoryProducts = products.flatMap((product) => {
    if (product.category !== category) return [];

    const output: CategoryProductInterface = {
      slug: product.slug,
      name: product.name,
      image: product.categoryImage,
      new: product.new,
      description: product.description,
    };

    return output;
  });

  return NextResponse.json({ data: categoryProducts });
}
