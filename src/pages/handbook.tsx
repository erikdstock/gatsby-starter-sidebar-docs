import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Box, Text, Flex } from "rebass"
import Layout from "../layouts/SiteLayout"
import { display, DisplayProps } from "styled-system"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

const DisplayBox = styled(Box)<DisplayProps>`
  ${display};
`
const DesktopTree = () => (
  <DisplayBox bg="lightblue" display={["none", "block"]}>
    <Text>Desktop</Text>
  </DisplayBox>
)
const MobileTree = props => (
  <DisplayBox bg="papayawhip" display={["block", "none"]}>
    <Text>Mobile</Text>
    <Text fontFamily="mono">{JSON.stringify(props)}</Text>{" "}
  </DisplayBox>
)

const HandbookPage = ({ data }) => {
  const { edges: pages } = data.allMdx

  return (
    <Layout>
      <Flex flexDirection={["column", "row"]}>
        <Tree pages={pages} />
        <Box>
          <MDXRenderer>{pages[0].node.code.body}</MDXRenderer>
        </Box>
      </Flex>
    </Layout>
  )
}
export default HandbookPage

const Tree = ({ pages }) => (
  <>
    <DesktopTree {...pages} />
    <MobileTree {...pages} />
  </>
)

export const pageQuery = graphql`
  query HandbookQuery {
    allMdx(filter: { fileAbsolutePath: { regex: "handbook/" } }) {
      edges {
        node {
          id
          frontmatter {
            collectionName
          }
          code {
            body
          }
        }
      }
    }
  }
`
