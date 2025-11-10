'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from '../lib/i18n';
import { useState } from 'react';
import {
  Box,
  Button as ChakraButton,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import BrandLogo from './BrandLogo';

export default function Header() {
  const t = useTranslations('nav');
  const router = useRouter();
  const locale = router.locale || 'en';
  const pathname = router.asPath;
  const [open, setOpen] = useState(false);
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  const otherLocale = locale === 'en' ? 'de' : 'en';
  const flags = {
    en: '\uD83C\uDDFA\uD83C\uDDF8',
    de: '\uD83C\uDDE9\uD83C\uDDEA',
  } as const;

  const links = (
    <>
      <Link
        href="/"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {t('home')}
      </Link>
      <Link
        href="/prices"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {(() => {
          const val = t('prices');
          return val === 'prices' ? t('sessions') : val;
        })()}
      </Link>
      <Link
        href="/yoga"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {t('yoga')}
      </Link>
      <Link
        href="/energy-work"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {t('energyWork')}
      </Link>
      <Link
        href="/about"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {t('about')}
      </Link>
      <Link
        href="/faq"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {t('faq')}
      </Link>
      <Link
        href="/contact"
        className="px-2 py-1 transition-all duration-200 rounded hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => setOpen(false)}
      >
        {t('contact')}
      </Link>
    </>
  );

  return (
    <Box
      as="header"
      bg="primary.500"
      borderBottomWidth="1px"
      borderColor="neutralBorder"
      color="contrastText"
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
      <div className="flex items-center flex-shrink-0">
        <BrandLogo onClick={() => setOpen(false)} />
          </div>

      <nav className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14 text-base font-medium text-gray-100 dark:text-gray-100">
        {links}
          </nav>

          <div className="flex items-center justify-end ml-auto">
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <IconButton
                aria-label={t('toggleTheme')}
                icon={<SwitchIcon />}
                variant="ghost"
                color="contrastText"
                _hover={{ bg: 'primary.600' }}
                onClick={toggleColorMode}
                size="sm"
              />
              <ChakraButton
                size="sm"
                variant="ghost"
                color="contrastText"
                _hover={{ bg: 'primary.600' }}
                onClick={() => router.push(pathname, pathname, { locale: otherLocale })}
                className="px-2 py-1"
              >
                <span className="mr-1" aria-hidden="true">{flags[otherLocale as keyof typeof flags]}</span>
                <span className="uppercase">{otherLocale}</span>
              </ChakraButton>
            </div>

            <div className="flex items-center justify-end space-x-5">
              <IconButton
                aria-label="Menu"
                color="contrastText"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
                variant="ghost"
                display={{ base: 'inline-flex', lg: 'none' }}
                className="p-2 -m-2"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="px-4 pt-4 pb-6 space-y-2 lg:hidden">
          <nav className="flex flex-col space-y-2 text-base font-medium text-gray-100 dark:text-gray-100">
            {links}
          </nav>
          <IconButton
            aria-label={t('toggleTheme')}
            icon={<SwitchIcon />}
            variant="ghost"
            color="contrastText"
            _hover={{ bg: 'primary.600' }}
            onClick={toggleColorMode}
            size="sm"
            className="mr-2"
          />
          <ChakraButton
            size="sm"
            variant="ghost"
            color="contrastText"
            _hover={{ bg: 'primary.600' }}
            onClick={() => router.push(pathname, pathname, { locale: otherLocale })}
            className="px-2 py-1"
          >
            <span className="mr-1" aria-hidden="true">{flags[otherLocale as keyof typeof flags]}</span>
            <span className="uppercase">{otherLocale}</span>
          </ChakraButton>
        </div>
      )}
    </Box>
  );
}
