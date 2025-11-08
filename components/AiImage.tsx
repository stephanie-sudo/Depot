import React from 'react';
import { Image, type ImageProps } from '@chakra-ui/react'

const SORA_HINT = 'Image generated with OpenAI Sora'

type AiImageProps = ImageProps & { alt?: string }

export default function AiImage({ alt = '', ...props }: AiImageProps) {
  const altText = alt ? `${alt}${alt.endsWith('.') ? '' : '.'} ${SORA_HINT}` : SORA_HINT
  return <Image alt={altText} {...props} />
}
