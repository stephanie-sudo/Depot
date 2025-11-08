import React, { useState, useCallback, useEffect } from 'react'
import { Box, Flex, HStack } from '@chakra-ui/react'
import TestimonialCard from './TestimonialCard'

export interface TestimonialItem {
  quote: string
  name: string
  avatar?: string
  rating?: number
  createdAt?: string
}

const SLIDE_CHANGE_THRESHOLD = 100
const AUTOPLAY_INTERVAL = 10000


export default function TestimonialCarousel({ items }: { items: TestimonialItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const slidesCount = items.length

  const prevSlide = useCallback(() => {
    setCurrentSlide(s => (s === 0 ? slidesCount - 1 : s - 1))
  }, [slidesCount])

  const nextSlide = useCallback(() => {
    setCurrentSlide(s => (s === slidesCount - 1 ? 0 : s + 1))
  }, [slidesCount])

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true)
    setDragStartX(e.clientX)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging) {
        const diffX = e.clientX - dragStartX
        setDragOffset(diffX)
        e.preventDefault()
      }
    },
    [dragging, dragStartX],
  )

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      setDragging(false)
      if (Math.abs(dragOffset) > SLIDE_CHANGE_THRESHOLD) {
        const slideChange = dragOffset > 0 ? prevSlide : nextSlide
        slideChange()
      }
      setDragOffset(0)
    }
  }, [dragging, dragOffset, prevSlide, nextSlide])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setDragging(true)
    setDragStartX(e.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (dragging) {
        const diffX = e.touches[0].clientX - dragStartX
        setDragOffset(diffX)
      }
    },
    [dragging, dragStartX],
  )

  const handleTouchEnd = useCallback(() => {
    if (dragging) {
      setDragging(false)
      if (Math.abs(dragOffset) > SLIDE_CHANGE_THRESHOLD) {
        const slideChange = dragOffset > 0 ? prevSlide : nextSlide
        slideChange()
      }
      setDragOffset(0)
    }
  }, [dragging, dragOffset, prevSlide, nextSlide])

  const slideOffset =
    currentSlide === 0
      ? Math.min(dragOffset, 0)
      : currentSlide === slidesCount - 1
      ? Math.max(dragOffset, 0)
      : dragOffset
  const carouselStyle = {
    transition: dragging ? 'none' : 'all .5s',
    ml: `calc(-${currentSlide * 100}% + ${slideOffset}px)`,
  }

  return (
    <Flex
      w="full"
      p={{ base: 4, md: 10 }}
      align="center"
      justify="center"
      cursor={dragging ? 'grabbing' : 'auto'}
      onMouseLeave={handleMouseUp}
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex
          w="full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          {...carouselStyle}
        >
          {items.map((item, sid) => (
            <Box key={sid} boxSize="full" flex="none" px={2}>
              <Flex w="full" h="full" align="center" justify="center">
                <TestimonialCard {...item} showRating={false} />
              </Flex>
            </Box>
          ))}
        </Flex>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={slide}
              cursor="pointer"
              boxSize={[2, 3]}
              m="0 2px"
              bg={currentSlide === slide ? 'blackAlpha.800' : 'blackAlpha.500'}
              rounded="full"
              transition="background-color 0.6s ease"
              _hover={{ bg: 'blackAlpha.800' }}
              onClick={() => setCurrentSlide(slide)}
            />
          ))}
        </HStack>
      </Flex>
    </Flex>
  )
}

