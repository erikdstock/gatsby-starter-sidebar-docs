import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Box, Flex } from "rebass"
import { maxWidth, MaxWidthProps } from "styled-system"
import Nav from "../components/Nav"
import styled from "styled-components"

const PageContent = styled(Box)<MaxWidthProps>`
  ${maxWidth};
`

const PageHeight = styled(Flex)`
  min-height: 100vh;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={staticQuery}
    render={data => (
      <PageHeight flexDirection="column">
        <Flex flexDirection="row" flex="1 0 auto">
          <Nav
            siteTitle={data.site.siteMetadata.title}
            pages={data.pages.edges.map(e => e.node)}
          />

          <PageContent
            pt={4}
            px={3}
            pb={3}
            width={[1, 0.95, 0.9]}
            maxWidth="1080px"
            as="main"
          >
            {children}
          </PageContent>
        </Flex>
        <Box as="footer" py={1} px={[1, 2, 5]} margin="auto 0 0 0">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Box>
      </PageHeight>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const staticQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
    pages: allMdx(filter: { frontmatter: { collectionName: { ne: "blog" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            collectionName
            ordering
          }
        }
      }
    }
  }
`

export default Layout
