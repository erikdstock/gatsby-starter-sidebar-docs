/*
 * This file needs to be .jsx because the netlify-cms must consume it.
 */

import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import styledNormalize from "styled-normalize"
import { themeGet } from "styled-system"

const gray = {
  "1": "hsl(0,0%,32%)",
  "2": "hsl(0,0%,47%)",
  "3": "hsl(0,0%,58%)",
  "4": "hsl(0,0%,68%)",
  "5": "hsl(0,0%,77%)",
  "6": "hsl(0,0%,85%)",
  "7": "hsl(0,0%,93%)",
}

const colors = {
  inactiveGray: gray["5"],
  gray,
}

const fonts = {
  mono: "Fira Mono",
  sans: "Lato, Helvetica, sans-serif",
  serif: "Karma, Times, serif",
}

const theme = {
  breakpoints: ["40em", "52em", "64em"],
  fonts,
  colors,
  buttons: {
    primary: {
      fontFamily: fonts.sans,
    },
    disabled: {
      background: gray[4],
      color: "white",
      border: `2px solid ${gray[6]}`,
      fontFamily: fonts.sans,
    },
  },
}

export const themeDig = (path = "") =>
  path
    .split(".")
    .filter(i => i)
    .reduce((acc, current) => acc[current], theme)

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize};
  * {
    font-family: ${fonts.serif};
  }
  h1,h2,h3 {
    font-family: ${fonts.sans};
  }
`

export const Theme = props => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {props.children}
    </>
  </ThemeProvider>
)
