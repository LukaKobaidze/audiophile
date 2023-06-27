import { Metadata } from 'next';
import { fetchAllProducts, fetchProduct } from '@/helpers/fetch';
import Product from './Product';
import NotFound from './NotFound';

export async function generateStaticParams() {
  const { data } = await fetchAllProducts();

  return data.map((product) => ({
    slug: product.slug,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { data, error } = await fetchProduct(params.slug);

  const metadata: Metadata = {
    icons: {
      icon: '/favicon.png',
    },
  };

  if (error) {
    metadata.title = 'Product Not Found | Audiophile';
  } else {
    metadata.title = data.name + ' | Audiophile';
    metadata.description = data.description;
  }

  return metadata;
}

export default async function ProductPage({ params }: Props) {
  const { data, error } = await fetchProduct(params.slug);

  return <>{error ? <NotFound /> : <Product data={data} />}</>;
}
