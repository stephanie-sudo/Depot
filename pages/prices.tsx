import { Box, Container, Heading, Text, Stack, SimpleGrid, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TierCard from '@/components/TierCard';
import { useTranslations } from '@/lib/i18n';

export default function PricesPage() {
  const { locale = 'en' } = useRouter();
  const t = useTranslations('sessions'); // reuse existing session translation keys

  const sessionTiers = [
    {
      title: t('singleTitle'),
      price: '€60',
      description: t('yogaLessonDesc') || t('energyStandardDesc') || t('description'),
      features: [t('singleFeature1'), t('singleFeature2')],
      link: '/contact',
    },
    {
      title: t('balance5Title') || t('standard5Title') || t('balance5Title'),
      price: '€275',
      description: t('balance5Feature1') || t('balance5Feature2'),
      features: [t('balance5Feature1'), t('balance5Feature2')],
      link: '/contact',
      highlight: true,
    },
  ];

  const handleBook = () => {
    // Placeholder - redirects happen via the tier card link
  };

  const rawPricesTitle = t('pricesTitle');
  const pageTitle = rawPricesTitle === 'pricesTitle' ? (t('title') || 'Preise') : rawPricesTitle;

  const rawPricesDesc = t('pricesDescription');
  const pageDescription = rawPricesDesc === 'pricesDescription' ? (t('description') || '') : rawPricesDesc;

  return (
    <>
      <Head>
        <title>{pageTitle} | Steffi</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Box as="main" minH="70vh">
        <Container maxW="container.xl" py={16}>
          <VStack spacing={12} align="stretch">
            <VStack spacing={4} textAlign="center">
              <Heading as="h1" size="2xl" color="textDefault">
                {pageTitle}
              </Heading>
              <Text fontSize="lg" color="textSecondary" maxW="2xl" mx="auto">
                {pageDescription}
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="4xl" mx="auto">
              {sessionTiers.map((tier) => (
                <TierCard key={tier.title} pkg={tier} onBook={handleBook} bookLabel={t('book')} />
              ))}
            </SimpleGrid>

            <VStack spacing={4} pt={8} textAlign="center">
              <Text color="textSecondary">{t('pricingTitle') || t('pricingHeading') || ''}</Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
