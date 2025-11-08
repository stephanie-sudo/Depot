import React from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary'
  showArrow?: boolean
  href?: string
  children?: React.ReactNode
}

export default function Button({
  variant = 'primary',
  showArrow = true,
  children,
  ...props
}: ButtonProps) {
  const chakraVariant = variant === 'primary' ? 'solid' : 'outline'
  return (
    <ChakraButton
      colorScheme="blue"
      variant={chakraVariant}
      rightIcon={
        showArrow ? (
          <ArrowForwardIcon
            aria-hidden="true"
            focusable="false"
            className="focus:outline-none"
          />
        ) : undefined
      }
      _hover={showArrow ? { '> svg': { transform: 'translateX(4px)' } } : undefined}
      transition="transform 0.2s"
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
