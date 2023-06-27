'use client';
import { createPortal } from 'react-dom';
import { AlertOutsideClick, Backdrop } from '@/components';
import styles from './Modal.module.scss';

interface Props {
  onOutsideClick?: () => void;
  shouldHandleOutsideClick?: boolean;
  outsideClickIgnore?: React.RefObject<Element>[];
  portal?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function Modal(props: Props) {
  const {
    children,
    className,
    onOutsideClick,
    shouldHandleOutsideClick,
    outsideClickIgnore,
    portal,
  } = props;

  const modalElement = (
    <>
      {onOutsideClick ? (
        <AlertOutsideClick
          onOutsideClick={onOutsideClick}
          shouldHandle={shouldHandleOutsideClick}
          ignore={outsideClickIgnore}
          className={`${styles.modal} ${className || ''}`}
        >
          {children}
        </AlertOutsideClick>
      ) : (
        <div className={`${styles.modal} ${className || ''}`}>{children}</div>
      )}
    </>
  );

  return (
    <>
      <Backdrop />

      {portal ? createPortal(modalElement, document.body) : modalElement}
    </>
  );
}
