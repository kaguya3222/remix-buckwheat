import { Box, Heading, Image } from '@chakra-ui/react'
import React from 'react'

import type { Product } from '~/api'

export const ProductCard: React.FC<Product> = ({ title, img, href }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl" marginBottom="10px">
        {title}
      </Heading>
      <Box as="a" boxSize="sm" href={href} target="_blank">
        <Image src={img} alt={title} />
      </Box>
    </Box>
  )
}
