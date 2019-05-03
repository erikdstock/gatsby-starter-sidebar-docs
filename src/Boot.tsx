import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { Theme } from "./Theme"
import { MDXGlobalComponents, MDXLayoutComponents } from "./components/UI"

export const Boot: React.SFC<{ element: any }> = ({ element }) => {
  return (
    <Theme>
      <>
        <MDXProvider
          components={{
            ...MDXLayoutComponents,
            ...MDXGlobalComponents,
            wrapper: ({ children }) => <>{children}</>,
          }}
        >
          {element}
        </MDXProvider>
      </>
    </Theme>
  )
}
