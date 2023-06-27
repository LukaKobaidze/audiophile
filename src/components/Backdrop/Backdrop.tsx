'use client';
import { createPortal } from 'react-dom';
import styles from './Backdrop.module.scss';

export default function Backdrop() {
  return createPortal(<div className={styles.backdrop} />, document.body);
}
