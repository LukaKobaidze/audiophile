import { Metadata } from 'next';
import { productsData } from '@/data/products';
import { getProduct } from '@/helpers';
import Product from './Product';
import NotFound from './NotFound';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const data = getProduct(params.slug);

  const metadata: Metadata = {
    icons: {
      icon: '/favicon.png',
    },
  };

  if (!data) {
    metadata.title = 'Product Not Found | Audiophile';
  } else {
    metadata.title = data.name + ' | Audiophile';
    metadata.description = data.description;
  }

  return metadata;
}

export default async function ProductPage({ params }: Props) {
  const data = getProduct(params.slug);

  return <>{!data ? <NotFound /> : <Product data={data} />}</>;
}
