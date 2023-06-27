'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { CartContext } from '@/context/cart.context';
import { ProductInterface } from '@/types';
import {
  ProductDescription,
  Quantity,
  Heading,
  Paragraph,
  ProductDescriptionLoading,
  ContentWrapper,
  ImageResponsive,
} from '@/components';
import styles from './Product.module.scss';

interface Props {
  data: ProductInterface;
}

export default function Product({ data }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  return (
    <ContentWrapper>
      <Link href={`/${data?.category || ''}`} className={styles.goBack}>
        Go Back
      </Link>

      {data ? (
        <>
          <div className={styles.introduction}>
            <div className={styles.introductionImgWrapper}>
              <Image
                src={'/' + data.image.desktop}
                alt={data.name}
                fill
                sizes="100vw"
                className={styles.introductionImg}
              />
            </div>

            <div className={styles.introductionDescription}>
              <ProductDescription
                isNew={data.new}
                heading={data.name}
                headingTagLevel="1"
                headingStyleLevel="2"
                paragraph={data.description}
                className={styles.introductionDescriptionText}
                classNameParagraph={styles.introductionParagraph}
                classNameHeading={styles.introductionHeading}
                hideButton
              />
              <div className={styles.introductionPrice}>
                $ {data.price.toLocaleString()}
              </div>
              <div className={styles.introductionAddToCart}>
                <Quantity
                  quantity={quantity}
                  min={1}
                  onChange={handleQuantityChange}
                  className={styles.introductionQuantity}
                />
                <button
                  className="button-1"
                  onClick={() => addToCart(data.id, quantity)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.features}>
              <Heading tagLevel="2" styleLevel="3" className={styles.detailsHeading}>
                Features
              </Heading>
              <Paragraph className={styles.detailsParagraph}>
                {data.features}
              </Paragraph>
            </div>
            <div className={styles.box}>
              <Heading
                tagLevel="2"
                styleLevel="3"
                className={`${styles.detailsHeading} ${styles.boxHeading}`}
              >
                In the box
              </Heading>
              <ul>
                {data.includes.map(({ quantity, item }) => (
                  <li key={item} className={styles.boxItem}>
                    <span className={styles.boxQuantity}>{quantity}x</span>
                    <Paragraph className={styles.detailsParagraph}>{item}</Paragraph>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.gallery}>
            <div className={styles.galleryGroup}>
              <div className="image-wrapper">
                <ImageResponsive
                  desktop={{ path: '/' + data.gallery.first.desktop }}
                  tablet={{ path: '/' + data.gallery.first.tablet }}
                  mobile={{ path: '/' + data.gallery.first.mobile }}
                  alt=""
                  fill
                />
              </div>
              <div className="image-wrapper">
                <ImageResponsive
                  desktop={{ path: '/' + data.gallery.second.desktop }}
                  tablet={{ path: '/' + data.gallery.second.tablet }}
                  mobile={{ path: '/' + data.gallery.second.mobile }}
                  alt=""
                  fill
                />
              </div>
            </div>
            <div className="image-wrapper">
              <ImageResponsive
                desktop={{ path: '/' + data.gallery.third.desktop }}
                tablet={{ path: '/' + data.gallery.third.tablet }}
                mobile={{ path: '/' + data.gallery.third.mobile }}
                alt=""
                fill
              />
            </div>
          </div>
          <div className={styles.others}>
            <Heading tagLevel="2" styleLevel="3">
              YOU MAY ALSO LIKE
            </Heading>
            <div className={styles.othersItems}>
              {data.others.map((item) => (
                <div className={styles.othersItem} key={item.name}>
                  <div className={styles.othersImgWrapper}>
                    <ImageResponsive
                      desktop={{ path: '/' + item.image.desktop }}
                      mobile={{ path: '/' + item.image.mobile, breakpoint: 550 }}
                      alt=""
                      className={styles.othersImg}
                      fill
                    />
                  </div>
                  <Heading
                    tagLevel="3"
                    styleLevel="5"
                    className={styles.othersItemHeading}
                  >
                    {item.name}
                  </Heading>
                  <Link
                    className={`button-1 ${styles.othersAnchor}`}
                    href={'/product/' + item.slug}
                  >
                    SEE PRODUCT
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <ProductDescriptionLoading />
      )}
    </ContentWrapper>
  );
}
