import React from "react"
import { Box } from "rebass"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { graphql } from "gatsby"
import { H2 } from "../components/UI"
import Layout from "../layouts/SiteLayout"
import SEO from "../components/SEO"

/**
 * An MDX Layout (requires a default export)
 */
export default ({ data: { mdx } }) => {
  return (
    <Layout>
      <SEO title={mdx.frontmatter.title} keywords={mdx.frontmatter.tags} />
      {/*
      The SEO block is already in the main page layouts (pages/index.tsx etc) -
      This from the example is intended to be used if you are writing whole pages from mdx
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    */}
      <H2>{mdx.frontmatter.title}</H2>
      <Box my={2}>
        <MDXRenderer>{mdx.code.body}</MDXRenderer>
      </Box>
    </Layout>
  )
}

/**
 * Query for data for the page. Note that $id is injected in via context from
 * actions.createPage. See gatsby-node.js for more info.
 */
export const pageQuery = graphql`
  query MDXPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        tags
      }
      code {
        body
      }
    }
  }
`
