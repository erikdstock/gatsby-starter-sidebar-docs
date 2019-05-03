// These files must stay js/x because they are also accessed by netlify-cms
import * as Rebass from "rebass"

import { BlockQuote } from "./BlockQuote.jsx"
import { Button } from "./Button"
import { P, H1, H2, H3, H4 } from "./Text"

// MDX elements- see https://gatsby-mdx.netlify.com/guides/customizing-components
export const MDXLayoutComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  blockquote: BlockQuote,
}

export const MDXGlobalComponents = {
  ...Rebass,
  Button,
}

export { Button, P, H1, H2, H3, H4 }
