import Link from 'next/link';
import { homeData as data } from '@/data';
import {
  ProductDescription,
  Heading,
  AboutUs,
  ContentWrapper,
  ImageResponsive,
  Categories,
} from '@/components';
import styles from './page.module.scss';

export const metadata = {
  icons: {
    icon: '/favicon.png',
  },
  title: 'Audiophile | LukaKobaidze',
  description: 'Generated by create next app',
};

export default function HomePage() {
  return (
    <>
      <div className={styles.hero}>
        <ImageResponsive
          desktop={{ path: '/' + data.hero.image.desktop }}
          tablet={{
            path: '/' + data.hero.image.tablet,
            breakpoint: 900,
          }}
          mobile={{ path: '/' + data.hero.image.mobile }}
          className={styles.heroBackground}
          alt=""
          fill
          priority
        />
        <ContentWrapper className={styles.heroContent}>
          <ProductDescription
            heading={data.hero.name}
            paragraph={data.hero.description}
            buttonVariant="1"
            isNew
            slug={data.hero.slug}
            className={styles.heroText}
            classNameNew={styles.heroTextNew}
            classNameParagraph={styles.heroTextParagraph}
          />
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <Categories className={styles.categories} />

        <div className={styles.productOne}>
          <div className={styles.productOneWrapper}>
            <div
              className={`${styles.productOneCircle} ${styles.productOneCircle1}`}
            />
            <div
              className={`${styles.productOneCircle} ${styles.productOneCircle2}`}
            />
            <div
              className={`${styles.productOneCircle} ${styles.productOneCircle3}`}
            />

            <div className={styles.productOneImgWrapper}>
              <div className={styles.productOneImg}>
                <ImageResponsive
                  desktop={{ path: '/' + data.productOne.image.desktop }}
                  tablet={{ path: '/' + data.productOne.image.tablet }}
                  mobile={{ path: '/' + data.productOne.image.mobile }}
                  alt={data.productOne.name}
                  fill
                />
              </div>
            </div>
            <ProductDescription
              heading={data.productOne.name}
              paragraph={data.productOne.description}
              slug={data.productOne.slug}
              buttonVariant="2"
              className={styles.productOneText}
              classNameParagraph={styles.productOneTextParagraph}
              classNameButton={styles.productOneButton}
            />
          </div>
        </div>

        <div className={styles.productTwo}>
          <ImageResponsive
            desktop={{ path: '/' + data.productTwo.image.desktop }}
            tablet={{
              path: '/' + data.productTwo.image.tablet,
              breakpoint: 1050,
            }}
            mobile={{
              path: '/' + data.productTwo.image.mobile,
              breakpoint: 515,
            }}
            alt=""
            className={styles.productTwoImg}
            fill
          />

          <div className={styles.productTwoContent}>
            <Heading tagLevel="2" styleLevel="4">
              {data.productTwo.name}
            </Heading>
            <Link
              href={'/product/' + data.productTwo.slug}
              className={`button-2 ${styles.productButton}`}
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>

        <div className={styles.productThree}>
          <div className={styles.productThreeImgWrapper}>
            <ImageResponsive
              desktop={{ path: '/' + data.productThree.image.desktop }}
              tablet={{ path: '/' + data.productThree.image.tablet }}
              mobile={{
                path: '/' + data.productThree.image.mobile,
                breakpoint: 550,
              }}
              alt=""
              className={styles.productThreeImg}
              fill
            />
          </div>
          <div className={styles.productThreeContent}>
            <Heading tagLevel="2" styleLevel="4">
              {data.productThree.name}
            </Heading>
            <Link
              href={'/product/' + data.productThree.slug}
              className={`button-2 ${styles.productButton}`}
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>

        <AboutUs className={styles.aboutUs} />
      </ContentWrapper>
    </>
  );
}
