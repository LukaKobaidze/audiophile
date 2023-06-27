'use client';
import { useEffect, useRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onOutsideClick: () => void;
  shouldHandle?: boolean;
  ignore?: React.RefObject<Element>[];
}

export default function AlertOutsideClick(props: Props) {
  const {
    ignore,
    shouldHandle = true,
    onOutsideClick,
    children,
    ...restProps
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      if (
        !ref.current?.contains(target) &&
        (!ignore || ignore.every((ref) => !ref.current?.contains(target)))
      ) {
        onOutsideClick();
      }
    };

    if (shouldHandle) {
      document.addEventListener('mousedown', handleEvent);
    } else {
      document.removeEventListener('mousedown', handleEvent);
    }

    return () => document.removeEventListener('mousedown', handleEvent);
  }, [shouldHandle, onOutsideClick, ignore]);

  return (
    <div ref={ref} {...restProps}>
      {children}
    </div>
  );
}
