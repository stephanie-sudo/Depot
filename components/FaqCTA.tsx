import React from 'react'
import NextLink from 'next/link'
import { Box, Container, Text, Button, Stack } from '@chakra-ui/react'

export interface FaqCTAProps {
  text: string
  linkText: string
  infoHref?: string
  infoText?: string
}

export default function FaqCTA({ text, linkText, infoHref, infoText }: FaqCTAProps) {
  return (
    <Box py={16}>
      <Container maxW="800px" textAlign="center">
        <Text fontSize="lg" mb={4} color="textSecondary">
          {text}
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="center">
          <Button as={NextLink} href="/faq" variant="submit" rounded="full">
            {linkText}
          </Button>
          {infoHref && infoText && (
            <Button as={NextLink} href={infoHref} variant="cardCta">
              {infoText}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
