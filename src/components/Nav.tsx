import { Link } from "gatsby"
import React from "react"
import { Box, Flex, Text } from "rebass"
import groupBy from "lodash/groupBy"
import { H4 } from "./UI/Text"

type Node = Branch | Article
type NavLinks = Node[]

interface Branch {
  title: string
  articles: Article[]
}
// Manual type assertion converting a Node to a branch:
// Easier way to do this inline: `if ('title' in node) =>> node is now a Branch`
//
// function isBranch(n: Node): n is Branch {
//   return (n as Branch).title !== undefined
// }

interface Article {
  frontmatter: {
    collectionName: string
    title: string
  }
  fields: { slug: string }
}

function makeTree(pages: Article[]): NavLinks {
  const grouped = groupBy(pages, p => p.frontmatter.collectionName)
  const navLinks: NavLinks = grouped["pages"]
  return Object.keys(grouped)
    .filter(name => name !== "pages")
    .reduce(
      (acc, name) =>
        acc.concat({
          title: name,
          articles: grouped[name],
        }),
      navLinks
    )
}

const BranchLinks: React.FunctionComponent<{
  branch: Branch
  show?: boolean
}> = ({ branch, show = true }) => (
  <Box pb={2}>
    <H4 color="gray.7">{branch.title}</H4>
    {show && (
      <Box pt={1}>
        {branch.articles.map(p => (
          <Link
            style={{ color: "white", textDecoration: "none" }}
            activeStyle={{ fontStyle: "bold" }}
            key={p.fields.slug}
            to={p.fields.slug}
          >
            <Text my={1} color="gray.7">
              {p.frontmatter.title}
            </Text>
          </Link>
        ))}
      </Box>
    )}
  </Box>
)

const Nav: React.FunctionComponent<{ siteTitle: string; pages: Article[] }> = ({
  siteTitle,
  pages,
}) => {
  const navTree = makeTree(pages)
  return (
    <Flex p={3} flexDirection="column" bg="gray.2" mb="1.45rem">
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
          return <BranchLinks key={node.title} branch={node} />
        } else if ("frontmatter" in node) {
          return (
            <Link
              style={{ color: "white", textDecoration: "none" }}
              activeStyle={{ fontStyle: "bold" }}
              key={node.fields.slug}
              to={node.fields.slug}
            >
              <H4 color="gray.7">{node.frontmatter.title}</H4>
            </Link>
          )
        }
      })}
    </Flex>
  )
}

export default Nav
