import Head from 'next/head';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslations } from '../lib/i18n';
import {
  GeneralIcon,
  YogaIcon,
  EnergyIcon,
} from '../components/ServiceIcons';

function FAQItem({ question, answer, icon }: { question: string; answer: ReactNode; icon: ReactNode }) {
  const chevronColor = useColorModeValue('gray.700', 'white');
  const iconBg = useColorModeValue('brand.100', 'brand.500');
  const iconColor = useColorModeValue('brand.500', 'white');
  return (
    <AccordionItem borderColor="gray.200" _dark={{ borderColor: 'gray.700' }}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Flex alignItems="center" minH={12}>
            <Flex
              shrink={0}
              alignItems="center"
              justifyContent="center"
              h={{ base: 8, md: 12 }}
              w={{ base: 8, md: 12 }}
              rounded="md"
              bg={iconBg}
              color={iconColor}
            >
              <Icon
                boxSize={{ base: 4, md: 6 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {icon}
              </Icon>
            </Flex>
            <Box ml={{ base: 2, md: 4 }}>
              <chakra.dt
                fontSize="lg"
                fontWeight="medium"
                lineHeight="6"
                color="gray.900"
                _dark={{ color: 'white' }}
              >
                {question}
              </chakra.dt>
            </Box>
          </Flex>
        </Box>
        <AccordionIcon color={chevronColor} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <chakra.dd mt={2} color="gray.500" _dark={{ color: 'gray.300' }}>
          {answer}
        </chakra.dd>
      </AccordionPanel>
    </AccordionItem>
  );
}

function FAQCategory({
  title,
  headingIcon,
  items,
}: {
  title: string;
  headingIcon: ReactNode;
  items: { question: string; answer: ReactNode; icon: ReactNode }[];
}) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const headingColor = useColorModeValue('gray.900', 'gray.100');
  return (
    <Box bg={bg} p={{ base: 4, md: 6 }} rounded="md" mb={8}>
      <Flex align="center" mb={4}>
        {headingIcon}
        <chakra.h3 ml={2} fontSize="xl" fontWeight="semibold" color={headingColor}>
          {title}
        </chakra.h3>
      </Flex>
      <Accordion allowToggle>
        {items.map((item, i) => (
          <FAQItem key={i} question={item.question} answer={item.answer} icon={item.icon} />
        ))}
      </Accordion>
    </Box>
  );
}

export default function FAQ() {
  const t = useTranslations('faq');
  const textColor = useColorModeValue('gray.900', 'gray.100');
  const headingIconColor = useColorModeValue('brand.500', 'brand.300');
  const categories = [
    {
      key: 'general',
      title: t('categories.general.title'),
      headingIcon: <GeneralIcon boxSize={{ base: 6, md: 8 }} color={headingIconColor} />,
      items: [
          {
            question: t('categories.general.item1.question'),
            answer: t('categories.general.item1.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            ),
          },
          {
            question: t('categories.general.item2.question'),
            answer: t('categories.general.item2.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M187l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            ),
          },
          {
            question: t('categories.general.item3.question'),
            answer: t('categories.general.item3.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            ),
          },
          {
            question: t('categories.general.item4.question'),
            answer: t('categories.general.item4.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            ),
          },
          {
            question: t('categories.general.item5.question'),
            answer: t('categories.general.item5.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            ),
          },
          {
            question: t('categories.general.item6.question'),
            answer: t('categories.general.item6.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            ),
          },
          {
            question: t('categories.general.item7.question'),
            answer: t('categories.general.item7.answer'),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            ),
          },
          {
            question: t('categories.general.item8.question'),
            answer: (
              <>
                {t('categories.general.item8.answer.part1')}{' '}
                <NextLink href="/contact" passHref legacyBehavior>
                  <chakra.a color="brand.500" textDecoration="underline">
                    {t('categories.general.item8.answer.linkText')}
                  </chakra.a>
                </NextLink>
                {t('categories.general.item8.answer.part2')}
              </>
            ),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            ),
          },
          {
            question: t('categories.general.item9.question'),
            answer: (
              <>
                {t('categories.general.item9.answer.part1')}{' '}
                <NextLink href="/contact" passHref legacyBehavior>
                  <chakra.a color="brand.500" textDecoration="underline">
                    {t('categories.general.item9.answer.linkText')}
                  </chakra.a>
                </NextLink>
                {t('categories.general.item9.answer.part2')}
              </>
            ),
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            ),
          },
          ],
      },
    {
      key: 'yoga',
      title: t('categories.yoga.title'),
      headingIcon: <YogaIcon boxSize={{ base: 6, md: 8 }} color={headingIconColor} />,
      items: [
        {
          question: t('categories.yoga.item1.question'),
          answer: t('categories.yoga.item1.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          ),
        },
        {
          question: t('categories.yoga.item2.question'),
          answer: t('categories.yoga.item2.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          ),
        },
        {
          question: t('categories.yoga.item3.question'),
          answer: t('categories.yoga.item3.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ),
        },
        {
          question: t('categories.yoga.item4.question'),
          answer: t('categories.yoga.item4.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ),
        },
      ],
    },
    {
      key: 'energy',
      title: t('categories.energy.title'),
      headingIcon: <EnergyIcon boxSize={{ base: 6, md: 8 }} color={headingIconColor} />,
      items: [
        {
          question: t('categories.energy.item1.question'),
          answer: t('categories.energy.item1.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.847-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          ),
        },
        {
          question: t('categories.energy.item2.question'),
          answer: t('categories.energy.item2.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 01.632-2.163V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
            />
          ),
        },
        {
          question: t('categories.energy.item3.question'),
          answer: t('categories.energy.item3.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ),
        },
        {
          question: t('categories.energy.item4.question'),
          answer: t('categories.energy.item4.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ),
        },
        {
          question: t('categories.energy.item5.question'),
          answer: t('categories.energy.item5.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ),
        },
        {
          question: t('categories.energy.item6.question'),
          answer: t('categories.energy.item6.answer'),
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ),
        },
      ],
      },
  ];

  return (
    <>
      <Head>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDescription')} />
      </Head>
      <Flex
        bg="gray.200"
        _dark={{ bg: 'gray.600' }}
        p={20}
        w="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          py={12}
          bg="white"
          _dark={{ bg: 'gray.900' }}
          rounded="xl"
          shadow="base"
          w="100%"
        >
          <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
            <Box textAlign="center">
              <chakra.h2
                mt={2}
                fontSize={{ base: '3xl', sm: '4xl' }}
                lineHeight="8"
                fontWeight="extrabold"
                letterSpacing="tight"
                color={textColor}
              >
                {t('title')}
              </chakra.h2>
              <chakra.p
                mt={4}
                maxW="2xl"
                fontSize="xl"
                mx={{ lg: 'auto' }}
                color="gray.500"
                _dark={{ color: 'gray.300' }}
              >
                {t('description')}
              </chakra.p>
            </Box>

            <Box mt={10}>
              {categories.map((cat) => (
                <FAQCategory
                  key={cat.key}
                  title={cat.title}
                  headingIcon={cat.headingIcon}
                  items={cat.items}
                />
              ))}
              <Box mt={6} textAlign="center">
                <Text
                  fontSize="lg"
                  color="gray.600"
                  _dark={{ color: 'gray.400' }}
                  mb={2}
                >
                  {t('more.text')}
                </Text>
                <Button as={NextLink} href="/contact" variant="cardCta">
                  {t('more.linkText')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

