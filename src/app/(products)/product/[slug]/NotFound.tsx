'use client';
import Link from 'next/link';
import { Heading } from '@/components';
import styles from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <Heading tagLevel="1" styleLevel="1" className={styles.notFoundStatus}>
        404
      </Heading>
      <Heading tagLevel="2" styleLevel="2">
        Product Not Found
      </Heading>
      <Link href="/" className={`button-1 ${styles.notFoundHome}`}>
        Go to Home
      </Link>
    </div>
  );
}
