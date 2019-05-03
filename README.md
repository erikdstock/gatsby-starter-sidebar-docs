[![Netlify Status](https://api.netlify.com/api/v1/badges/09b68422-f4b0-4a28-8fe7-c6fdf05fae79/deploy-status)](https://app.netlify.com/sites/festive-villani-316b3c/deploys)

<h1 align="center">
  Erik's Gatsby 2019 setup
</h1>

_Heavily inspired by
https://github.com/damassi/gatsby-starter-typescript-rebass-netlifycms_

I've done my best to keep commits for this setup step-by-step in hope others
might understand the process better and avoid some of the endless faffing I went
through.

## Steps

_These intermediate PRs worked at the time I did them but as some versions
upgraded bugs were introduced and fixed. They now exist mainly as documentation
of what changes I made for each step_.

The steps begin from a working typescript + styled-components setup on top of
the default gatsby starter.

1. [Introduce Rebass and re-implement most of the original site using its layout
   components](https://github.com/erikdstock/gatsby-starter-ts-mdx/pull/4)
2. [Set up markdown sources using `gatsby-transformer-remark`](https://github.com/erikdstock/gatsby-starter-ts-mdx/pull/9)
3. [Set up netlify-cms](https://github.com/erikdstock/gatsby-starter-ts-mdx/pull/10)
4. [Set up mdx sources using `gatsby-mdx`](https://github.com/erikdstock/gatsby-starter-ts-mdx/pull/11)
5. [Cleanup & most caveats for the above](https://github.com/erikdstock/gatsby-starter-ts-mdx/pull/12)

By default this starter has both mdx and markdown/remark extensions. MDX seems a
better fit for styled-components, so compare the
[`disable-remark`](https://github.com/erikdstock/gatsby-ts-2019/compare/disable-remark?expand=1)
branch for a rough diff on how to unwind that.

### TODOs:

- [ ] Netlify CMS is broken - see gatsbyjs/gatsby#12776 . I'll update when there
      is a more durable fix but for now pinning to netlify-cms 2.6 (2.6.0 works
      for me) should fix it.
- [ ] Relative imports for MDX Global Scoped components not working from
      gatsby-config
