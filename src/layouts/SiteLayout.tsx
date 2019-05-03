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
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        pages: allMdx(
          filter: { frontmatter: { collectionName: { ne: "blog" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                collectionName
              }
            }
          }
        }
      }
    `}
    render={data => (
      <PageHeight flexDirection="row">
        <Nav
          siteTitle={data.site.siteMetadata.title}
          pages={data.pages.edges.map(e => e.node)}
        />

        <PageContent
          alignSelf="center"
          width={[1, 0.95, 0.9]}
          maxWidth="1080px"
        >
          <Box p="0px 1.0875rem 1.45rem">
            <main>{children}</main>
          </Box>
        </PageContent>
        <Box py={2} px={[1, 2, 5]} margin="auto 0 0 0">
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Box>
      </PageHeight>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
