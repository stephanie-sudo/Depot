import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import TestimonialCarousel, {
  type TestimonialItem,
} from './TestimonialCarousel'
import FaqCTA, { type FaqCTAProps } from './FaqCTA'
import AiImage from './AiImage'
import ButtonLink from './Button'
import { useTranslations } from '../lib/i18n'

export interface Benefit {
  icon: string
  title: string
  text: string
}

export interface OfferItem {
  image: string
  title: string
  text: string
}

export interface ApproachItem {
  title: string
  text: string
}

export type Testimonial = TestimonialItem

export interface ServicePageProps {
  seo: { title: string; description: string }
  hero: { image: string; heading: string; text: string; cta: string; href: string }
  intro: { heading: string; text: string; benefits: Benefit[] }
  approach?: { heading: string; items: ApproachItem[]; notes?: string[] }
  offer: {
    heading: string
    subheading: string
    learnMore: string
    items: OfferItem[]
  }
  testimonials?: { heading: string; items: Testimonial[] }
  cta: {
    heading: string
    text: string
    button: string
    href: string
    moreHeading: string
    moreText: string
    moreButton: string
    moreHref: string
  }
  faqHook?: FaqCTAProps
}

export default function ServicePage({
  seo,
  hero,
  intro,
  approach,
  offer,
  testimonials,
  cta,
  faqHook,
}: ServicePageProps) {
  const checkColor = useColorModeValue('primary.500', 'highlight.300')
  const outlineColor = useColorModeValue('primaryAlpha.800', 'whiteAlpha.800')
  const t = useTranslations('testimonial')
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <Box as="main" bg="pageBg">
        {/* Hero Section */}
        <Box
          bgImage={`url('${hero.image}')`}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          position="relative"
        >
          <Box position="absolute" inset={0} bg="blackAlpha.600" />
          <Container
            maxW="800px"
            py={{ base: 20, md: 40 }}
            textAlign="center"
            position="relative"
            zIndex={1}
          >
            <Heading as="h1" size="2xl" mb={4} color="white">
              {hero.heading}
            </Heading>
            <Text fontSize="lg" mb={8} color="white">
              {hero.text}
            </Text>
            <Button
              as={NextLink}
              href={hero.href}
              variant="cta"
              size="lg"
              _hover={{ transform: 'scale(1.05)' }}
            >
              {hero.cta}
            </Button>
          </Container>
        </Box>

        {/* Introduction */}
        <Container maxW="1200px" py={16}>
          <Heading as="h2" mb={6}>
            {intro.heading}
          </Heading>
          <Text fontSize="lg" mb={10}>
            {intro.text}
          </Text>
          <Accordion allowToggle>
            {intro.benefits.map(benefit => (
              <AccordionItem
                key={benefit.title}
                borderColor="neutralBorder"
              >
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Flex align="center" minH={12}>
                      <Flex
                        shrink={0}
                        align="center"
                        justify="center"
                        h={{ base: 8, md: 12 }}
                        w={{ base: 8, md: 12 }}
                        rounded="md"
                        bg="primary.500"
                        color="white"
                        fontSize={{ base: 'md', md: '2xl' }}
                      >
                        {benefit.icon}
                      </Flex>
                      <Box ml={{ base: 2, md: 4 }}>
                        <Text fontSize="lg" fontWeight="medium">
                          {benefit.title}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text color="textSecondary">{benefit.text}</Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>

        {/* Approach Section */}
        {approach && (
          <Box bg="sectionBg" py={16}>
            <Container maxW="1200px">
              <Heading as="h2" mb={6}>
                {approach.heading}
              </Heading>
              <List spacing={4}>
                {approach.items.map(item => (
                  <ListItem
                    key={item.title}
                    display="flex"
                    alignItems="flex-start"
                  >
                    <ListIcon as={CheckCircleIcon} color={checkColor} mt={1} />
                    <Text>
                      <Text as="span" fontWeight="semibold">
                        {item.title}
                      </Text>{' '}
                      {item.text}
                    </Text>
                  </ListItem>
                ))}
              </List>
              {approach.notes?.map((note, idx) => (
                <Text mt={idx === 0 ? 6 : 4} key={note}>
                  {note}
                </Text>
              ))}
            </Container>
          </Box>
        )}

        {/* Offer Section */}
        <Box bg="sectionBg" py={16}>
          <Container maxW="1200px">
            <Heading as="h2" mb={4}>
              {offer.heading}
            </Heading>
            <Text fontSize="lg" mb={10}>
              {offer.subheading}
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {offer.items.map(item => (
                <Box
                  key={item.title}
                  bg="cardBg"
                  rounded="md"
                  shadow="md"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor="neutralBorder"
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="transform 0.2s"
                >
                  <AiImage src={item.image} alt={item.title} objectFit="cover" w="full" h="200px" />
                  <Box p={6}>
                    <Heading size="md" mb={2}>
                      {item.title}
                    </Heading>
                    <Text mb={4} whiteSpace="pre-line">
                      {item.text}
                    </Text>
                    <Button
                      variant="cardCta"
                      size="sm"
                      _hover={{ transform: 'scale(1.05)' }}
                    >
                      {offer.learnMore}
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Testimonials */}
        {testimonials && (
          <Container maxW="1000px" py={16}>
            <Heading as="h2" mb={8} textAlign="center">
              {testimonials.heading}
            </Heading>
            <TestimonialCarousel items={testimonials.items} />
            <Flex justify="center" mt={6}>
              <ButtonLink
                as={NextLink}
                href="/testimonials"
                variant="secondary"
                size="sm"
                color={outlineColor}
                borderColor={outlineColor}
                _hover={{ bg: 'sky.700', color: 'contrastText' }}
              >
                {t('link')}
              </ButtonLink>
            </Flex>
          </Container>
        )}

        {/* Final CTA */}
        <Box bgGradient="linear(to-r, primary.500, primary.600)" color="white" py={20} textAlign="center">
          <Container maxW="800px">
            <Heading as="h2" mb={4}>
              {cta.heading}
            </Heading>
            <Text fontSize="lg" mb={8}>
              {cta.text}
            </Text>
            <Button
              as={NextLink}
              href={cta.href}
              variant="cardCta"
              size="lg"
              _hover={{ transform: 'scale(1.05)' }}
            >
              {cta.button}
            </Button>
          </Container>
        </Box>

        {/* Cross Service CTA */}
        <Box bg="sectionBg" py={16}>
          <Container maxW="800px" textAlign="center">
            <Heading as="h3" mb={4}>
              {cta.moreHeading}
            </Heading>
            <Text fontSize="lg" mb={8}>
              {cta.moreText}
            </Text>
            <Button
              as={NextLink}
              href={cta.moreHref}
              variant="cardCta"
              size="md"
              _hover={{ transform: 'scale(1.05)' }}
            >
              {cta.moreButton}
            </Button>
          </Container>
        </Box>
        {faqHook && <FaqCTA {...faqHook} />}
      </Box>
    </>
  )
}

