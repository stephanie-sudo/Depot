import React from 'react';
import Link from 'next/link';
import AiImage from './AiImage';
import { useTheme } from '@chakra-ui/react';

export interface BrandLogoProps {
  onClick?: () => void;
}

export default function BrandLogo({ onClick }: BrandLogoProps) {
  const theme = useTheme();
  return (
    <Link href="/" className="inline-flex items-center" onClick={onClick}>
      <span className="sr-only">Moving Relaxation</span>
      <AiImage
        src="/logo_small.png"
        alt="Moving Relaxation logo"
        width={42}
        height={42}
        className="mr-2 h-[42px] w-[42px]"
      />
      <span
        className="the-nautigal-bold text-3xl underline underline-offset-4"
        style={{ textDecorationColor: theme.colors.accent[500] }}
      >
        Moving Relaxation
      </span>
    </Link>
  );
}
