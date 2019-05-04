import React from "react"
import { Text, Heading } from "rebass"

export const P = props => (
  <Text lineHeight="1.5" fontFamily="serif" {...props} />
)
export const H1 = props => (
  <Heading my={2} fontSize={5} as="h1" fontFamily="sans" {...props} />
)
export const H2 = props => (
  <Heading my={3} fontSize={4} as="h2" fontFamily="sans" {...props} />
)
export const H3 = props => (
  <Heading my={4} fontSize={3} as="h3" fontFamily="sans" {...props} />
)
export const H4 = props => (
  <Heading my={4} fontSize={2} as="h4" fontFamily="sans" {...props} />
)
