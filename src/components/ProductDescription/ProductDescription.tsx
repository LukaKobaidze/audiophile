import Link from 'next/link';
import { Heading, Overline, Paragraph } from '@/components';
import styles from './ProductDescription.module.scss';

interface Props {
  slug?: string;
  heading: string;
  paragraph: string;
  buttonVariant?: '1' | '2' | '3';
  isNew?: boolean;
  headingTagLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  headingStyleLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  className?: string;
  classNameHeading?: string;
  classNameParagraph?: string;
  classNameButton?: string;
  classNameNew?: string;
  hideButton?: boolean;
}

export default function ProductDescription(props: Props) {
  const {
    slug,
    heading,
    paragraph,
    buttonVariant = '1',
    isNew,
    headingTagLevel = '1',
    headingStyleLevel = '1',
    className,
    classNameHeading,
    classNameParagraph,
    classNameButton,
    classNameNew,
    hideButton,
  } = props;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {isNew && (
        <Overline className={`${styles.new} ${classNameNew}`}>New Product</Overline>
      )}
      <Heading
        tagLevel={headingTagLevel}
        styleLevel={headingStyleLevel}
        className={classNameHeading}
      >
        {heading}
      </Heading>
      <Paragraph className={`${styles.paragraph} ${classNameParagraph}`}>
        {paragraph}
      </Paragraph>

      {!hideButton && (
        <Link
          href={'/product/' + (slug || '')}
          className={`button-${buttonVariant} ${styles.button} ${classNameButton}`}
        >
          SEE PRODUCT
        </Link>
      )}
    </div>
  );
}
