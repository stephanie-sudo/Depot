import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  Tooltip,
  VStack,
  useClipboard,
  Switch,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { BsLinkedin, BsPerson } from 'react-icons/bs'
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6'
import { MdEmail, MdOutlineEmail, MdPhone } from 'react-icons/md'
import { useTranslations } from '../lib/i18n'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

export default function ContactForm() {
  const t = useTranslations('contact')

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? ''
  const xUrl = process.env.NEXT_PUBLIC_X_URL
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_URL
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK_URL
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL

  const { hasCopied, onCopy } = useClipboard(email)
  const { hasCopied: hasCopiedPhone, onCopy: onCopyPhone } = useClipboard(phone)

  const [contactByPhone, setContactByPhone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pending, setPending] = useState<{
    name: string
    email: string
    phone: string
    message: string
    contactByPhone: boolean
  } | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(ua))
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setPending({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      contactByPhone,
    })
    onOpen()
  }

  const handleCaptchaSuccess = async (token: string) => {
    if (!pending) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pending, captcha: token }),
      })
      if (res.ok) {
        const via = pending.contactByPhone ? 'phone' : 'mail'
        router.push(`/thank-you?via=${via}`)
        setPending(null)
        onClose()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const iconProps = {
    variant: 'ghost',
    colorScheme: 'primary' as const,
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
    _hover: { bg: 'primaryAlpha.400', transform: 'translateY(-2px)' },
    _active: { bg: 'primaryAlpha.800' },
  }

  return (
    <>
      <Flex id="contact" as="section" bg="sectionBg" justify="center" py={20}>
      <Box
        bg="cardBg"
        borderRadius="lg"
        p={8}
        shadow="base"
        w="full"
        maxW={{ base: '3xl', lg: '5xl' }}
      >
        <VStack spacing={8} textAlign="center">
          <Heading>{t('title')}</Heading>
          <Text color="textSecondary">{t('text')}</Text>
          <Stack
            spacing={{ base: 4, md: 8 }}
            direction={{ base: 'column', md: 'row' }}
            align="flex-start"
            justify="center"
            w={{ base: 'full', md: '80%' }}
            mx="auto"
          >
            <Stack
              direction={{ base: 'row', md: 'column' }}
              spacing={4}
              align="center"
              justify="center"
              w={{ base: 'full', md: '20%' }}
            >
              {phone && (
                isMobile ? (
                  <Box as="a" href={`tel:${phone}`}>
                    <IconButton aria-label={t('form.phone')} icon={<MdPhone />} {...iconProps} />
                  </Box>
                ) : (
                  <Tooltip
                    label={hasCopiedPhone ? t('form.phoneCopied') : t('form.copyPhone')}
                    closeOnClick={false}
                    hasArrow
                  >
                    <IconButton
                      aria-label={t('form.phone')}
                      icon={<MdPhone />}
                      onClick={onCopyPhone}
                      {...iconProps}
                    />
                  </Tooltip>
                )
              )}
              {email && (
                isMobile ? (
                  <Box as="a" href={`mailto:${email}`}>
                    <IconButton aria-label={t('form.email')} icon={<MdEmail />} {...iconProps} />
                  </Box>
                ) : (
                  <Tooltip
                    label={hasCopied ? t('form.emailCopied') : t('form.copyEmail')}
                    closeOnClick={false}
                    hasArrow
                  >
                    <IconButton
                      aria-label={t('form.email')}
                      icon={<MdEmail />}
                      onClick={onCopy}
                      {...iconProps}
                    />
                  </Tooltip>
                )
              )}
              {xUrl && (
                <Box as="a" href={xUrl} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label={t('form.x')} icon={<FaXTwitter />} {...iconProps} />
                </Box>
              )}
              {instagram && (
                <Box as="a" href={instagram} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label={t('form.instagram')} icon={<FaInstagram />} {...iconProps} />
                </Box>
              )}
              {facebook && (
                <Box as="a" href={facebook} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label={t('form.facebook')} icon={<FaFacebook />} {...iconProps} />
                </Box>
              )}
              {tiktok && (
                <Box as="a" href={tiktok} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label={t('form.tiktok')} icon={<FaTiktok />} {...iconProps} />
                </Box>
              )}
              {linkedin && (
                <Box as="a" href={linkedin} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label={t('form.linkedin')} icon={<BsLinkedin />} {...iconProps} />
                </Box>
              )}
            </Stack>
            <Box
              bg="sectionBg"
              borderRadius="md"
              p={6}
              w={{ base: 'full', md: '80%' }}
              as="form"
              onSubmit={handleSubmit}
            >
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>{t('form.name')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <BsPerson />
                    </InputLeftElement>
                    <Input
                      type="text"
                      name="name"
                      _hover={{ borderColor: 'primary.500' }}
                      transition="border-color 0.2s"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>{t('form.email')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdOutlineEmail />
                    </InputLeftElement>
                    <Input
                      type="email"
                      name="email"
                      _hover={{ borderColor: 'primary.500' }}
                      transition="border-color 0.2s"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired={contactByPhone}>
                  <FormLabel>{t('form.phone')}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <MdPhone />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      name="phone"
                      _hover={{ borderColor: 'primary.500' }}
                      transition="border-color 0.2s"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="contactByPhone" mb="0">
                    {t('form.preferPhone')}
                  </FormLabel>
                  <Switch
                    id="contactByPhone"
                    colorScheme="primary"
                    isChecked={contactByPhone}
                    onChange={(e) => setContactByPhone(e.target.checked)}
                  />
                </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('form.message')}</FormLabel>
                <Textarea
                  name="message"
                  rows={6}
                  resize="none"
                  _hover={{ borderColor: 'primary.500' }}
                  transition="border-color 0.2s"
                />
              </FormControl>
              <Button
                type="submit"
                variant="submit"
                width="full"
                isLoading={isSubmitting}
              >
                {t('form.send')}
              </Button>
              </VStack>
            </Box>
          </Stack>
        </VStack>
      </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('form.captcha')}</ModalHeader>
          <ModalCloseButton />

        </ModalContent>
      </Modal>
    </>
  )
}

