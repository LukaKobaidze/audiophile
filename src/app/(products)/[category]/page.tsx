import { Metadata } from 'next';
import Image from 'next/image';
import { CategoryProductInterface } from '@/types';
import {
  ProductDescription,
  ProductDescriptionLoading,
  ContentWrapper,
  Heading,
} from '@/components';
import styles from './page.module.scss';

export async function generateStaticParams() {
  const categories = ['headphones', 'speakers', 'earphones'];

  return categories.map((category) => ({ category }));
}

interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const metadata: Metadata = {
    icons: {
      icon: '/favicon.png',
    },
    title:
      params.category[0].toUpperCase() + params.category.slice(1) + ' | Audiophile',
  };

  return metadata;
}

export default async function CategoryPage({ params }: Props) {
  const { data }: { data: CategoryProductInterface[] } = await fetch(
    `${process.env.API_URL}/${params.category}`
  ).then((res) => res.json());

  return (
    <>
      <div className={styles.container}>
        <Heading tagLevel="1" styleLevel="1" className={styles.heading}>
          {params.category}
        </Heading>
      </div>

      <ContentWrapper className={styles.productsWrapper}>
        {data ? (
          data.map((product, i) => (
            <div
              className={`${styles.product} ${
                i % 2 !== 0 ? styles.productReverse : ''
              }`}
              key={product.slug}
            >
              <div className={styles.productImgWrapper}>
                <Image
                  src={'/' + product.image.desktop}
                  alt=""
                  fill
                  className={styles.productImg}
                  sizes="100vw"
                />
              </div>
              <ProductDescription
                slug={product.slug}
                heading={product.name}
                headingTagLevel="2"
                headingStyleLevel="2"
                paragraph={product.description}
                isNew={product.new}
                className={styles.productDescription}
                classNameParagraph={styles.productDescriptionParagraph}
                classNameHeading={styles.productDescriptionHeading}
                classNameButton={styles.productDescriptionButton}
              />
            </div>
          ))
        ) : (
          <ProductDescriptionLoading
            className={styles.product}
            classNameImg={`${styles.productImg} ${styles.loadingImg}`}
            classNameDescription={`${styles.productDescription} ${styles.loadingDescription}`}
          />
        )}
      </ContentWrapper>
    </>
  );
}
