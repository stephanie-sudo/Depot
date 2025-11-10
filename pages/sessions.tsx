import { Box, Container, Heading, Text, Stack, SimpleGrid, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TierCard from '@/components/TierCard';
import { useTranslations } from '@/lib/i18n';

export default function SessionsPage() {
  const { locale = 'en' } = useRouter();
  const t = useTranslations('sessions');

  const sessionTiers = [
    {
      title: 'Standard Session',
      price: '€60',
      description: 'Individual session tailored to your needs',
      features: ['60 minutes', 'One-on-one session', 'Flexible scheduling'],
      link: '/contact',
    },
    {
      title: 'Package (5 Sessions)',
      price: '€275',
      description: 'Save €25 with a session package',
      features: ['Save €25', '60 minutes each', 'Valid for 3 months'],
      link: '/contact',
      highlight: true,
    },
  ];

  const handleBook = () => {
    // Placeholder - redirects happen via the tier card link
  };

  return (
    <>
      <Head>
        <title>Sessions & Pricing | Steffi</title>
        <meta
          name="description"
          content="Book a session with Steffi - flexible pricing options available"
        />
      </Head>
      <Box as="main" minH="70vh">
        <Container maxW="container.xl" py={16}>
          <VStack spacing={12} align="stretch">
            <VStack spacing={4} textAlign="center">
              <Heading as="h1" size="2xl" color="textDefault">
                Sessions & Pricing
              </Heading>
              <Text fontSize="lg" color="textSecondary" maxW="2xl" mx="auto">
                Choose the option that works best for you. All sessions are conducted with care and attention.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="4xl" mx="auto">
              {sessionTiers.map((tier) => (
                <TierCard
                  key={tier.title}
                  pkg={tier}
                  onBook={handleBook}
                  bookLabel="Contact"
                />
              ))}
            </SimpleGrid>

            <VStack spacing={4} pt={8} textAlign="center">
              <Text color="textSecondary">
                For bookings or questions, please get in touch via the contact page.
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
