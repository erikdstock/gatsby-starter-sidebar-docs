import React from "react"
import styled from "styled-components"
import { Box } from "rebass"
import { themeDig } from "../../Theme"

export const BlockQuote = ({ children, ...restProps }) => (
  <Wrapper my={4} p={2} pl={3} {...restProps}>
    {children}
  </Wrapper>
)

const Wrapper = styled(Box)`
  border-left: 2px solid;
  border-color: ${themeDig("colors.gray.6")};
`
