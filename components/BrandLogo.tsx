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
      {/* accessible name for screen readers */}
      <span className="sr-only">Movit</span>
      <AiImage
        src="/logo_header.png"
        alt="Movit logo"
        h="42px"
        w="auto"
        className="mr-2"
      />
      {/* Brand text removed — now part of the logo image */}
    </Link>
  );
}
