'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from './LoadingProvider';

export const LoadingLink = ({ href, children, className, ...props }) => {
  const { setIsLoading } = useLoading();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};