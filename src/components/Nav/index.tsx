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
interface Branch {
  title: string
  articles: Article[]
}

interface Article {
  frontmatter: {
    collectionName: string
    title: string
    ordering: number
  }
  fields: { slug: string }
}

type Node = Branch | Article

type NavLinks = Node[]

export const Nav: React.FunctionComponent<{
  siteTitle: string
  pages: Article[]
}> = ({ siteTitle, pages }) => {
  const navTree = makeTree(pages)
  return (
    <Flex p={3} flexDirection="column" bg="gray.2" mb="1.45rem" flex="1 0 auto">
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
  branch: Branch
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

function makeTree(pages: Article[]): NavLinks {
  // Group articles by collection name
  const grouped: { [k: string]: Article[] } = groupBy(
    pages,
    p => p.frontmatter.collectionName
  )
  const ordered = Object.keys(grouped).reduce((acc, k) => {
    const withOrder = grouped[k].sort(
      (a, b) => a.frontmatter.ordering - b.frontmatter.ordering
    )
    return { ...acc, [k]: withOrder }
  }, {})

  // Grab the `pages` (top-level articles) collection
  const navLinks: NavLinks = ordered["pages"]

  // Append sections to them
  return Object.keys(ordered)
    .filter(collectionName => collectionName !== "pages")
    .reduce(
      (acc, collectionName) =>
        acc.concat({
          title: directory[collectionName] || collectionName,
          articles: ordered[collectionName],
        }),
      navLinks
    )
}

export default Nav
