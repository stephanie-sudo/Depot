import { Box, SimpleGrid, VStack, Heading, Text } from '@chakra-ui/react'
import AiImage from '../AiImage'
import { useTranslations } from '../../lib/i18n'

export default function StorySection() {
  const t = useTranslations('about')
  return (
    <Box py={16}>
      <SimpleGrid
        maxW="1200px"
        mx="auto"
        columns={{ base: 1, md: 2 }}
        gap={8}
        px={4}
        alignItems="center"
      >
        <AiImage
          src="/images/story.jpg"
          alt={t('storyImageAlt')}
          borderRadius="md"
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <VStack align="start" spacing={6}>
          <Heading as="h2">{t('storyHeading')}</Heading>
          {[t('storyP1'), t('storyP2'), t('storyP3'), t('storyP4')].map((p, i) => (
            <Text key={i} color="textSecondary">
              {p}
            </Text>
          ))}
        </VStack>
      </SimpleGrid>
    </Box>
  )
}
