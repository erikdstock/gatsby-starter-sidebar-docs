import { Link } from "gatsby"
import React from "react"
import { Box, Flex, Text, Heading } from "rebass"
import groupBy from "lodash/groupBy"
import directory from "./directory"

// Manual type assertion converting a Node to a branch:
// Easier way to do this inline: `if ('title' in node) =>> node is now a Branch`
//
// function isBranch(n: Node): n is Branch {
//   return (n as Branch).title !== undefined
// }
interface Section {
  title: string
  articles: Page[]
}

interface Page {
  frontmatter: {
    title: string
    ordering: number
  }
  fields: {
    slug: string
    sectionName: string
  }
}

type NavNode = Section | Page

export const Nav: React.FunctionComponent<{
  siteTitle: string
  pages: Page[]
}> = ({ siteTitle, pages }) => {
  const navTree = makeTree(pages)
  return (
    <Flex p={3} flexDirection="column" bg="gray.2" mb="1.45rem" flex="0 0 auto">
      <Box my={0} mx="auto" p="1.45rem 1.0875rem">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Text as="h1" color="gray.7" fontFamily="sans" style={{ margin: 0 }}>
            {siteTitle}
          </Text>
        </Link>
      </Box>
      {navTree.map(node => {
        if ("title" in node) {
          return <SubMenu key={node.title} branch={node} />
        } else if ("frontmatter" in node) {
          return (
            <Link
              style={{ color: "white" }}
              activeStyle={{ fontStyle: "bold" }}
              key={node.fields.slug}
              to={node.fields.slug}
            >
              <Heading my={2} color="gray.7">
                {node.frontmatter.title}
              </Heading>
            </Link>
          )
        }
      })}
    </Flex>
  )
}

const SubMenu: React.FunctionComponent<{
  branch: Section
  show?: boolean
}> = ({ branch, show = true }) => (
  <Box pb={2}>
    <Heading color="gray.7">{branch.title}</Heading>
    {show && (
      <Box pt={1}>
        {branch.articles.map(p => (
          <Link
            style={{ color: "white" }}
            activeStyle={{ fontStyle: "bold" }}
            key={p.fields.slug}
            to={p.fields.slug}
          >
            <Heading fontSize={2} pl={2} lineHeight={1.3} color="gray.7">
              {p.frontmatter.title}
            </Heading>
          </Link>
        ))}
      </Box>
    )}
  </Box>
)

function makeTree(pages: Page[]): NavNode[] {
  // Group articles by sectionName (see gatsby-node.js)
  const groupedPages: { [k: string]: Page[] } = groupBy(
    pages,
    p => p.fields.sectionName
  )
  const orderedPages = Object.keys(groupedPages).reduce((acc, k) => {
    const withOrder = groupedPages[k].sort(
      (a, b) => a.frontmatter.ordering - b.frontmatter.ordering
    )
    return { ...acc, [k]: withOrder }
  }, {})

  // Grab the `pages` (top-level articles) collection
  const navLinks: NavNode[] = orderedPages["pages"]

  // Append sections to them
  return Object.keys(orderedPages)
    .filter(sectionName => sectionName !== "pages")
    .reduce(
      (acc, sectionName) =>
        acc.concat({
          title: directory[sectionName] || sectionName,
          articles: orderedPages[sectionName],
        }),
      navLinks
    )
}

export default Nav
