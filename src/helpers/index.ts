import { productsData } from '@/data/products';
import { CategoryProductInterface, ProductInterface } from '@/types';

export function getProduct(slug: string): ProductInterface | null {
  const product = productsData.find((product) => product.slug === slug);

  if (!product) return null;

  return {
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
}

export function getCategoryProducts(category: string): CategoryProductInterface[] {
  return productsData.flatMap((product) => {
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
}
