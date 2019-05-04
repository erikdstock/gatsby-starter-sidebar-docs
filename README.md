[![Netlify Status](https://api.netlify.com/api/v1/badges/cb3b5fc0-3885-4e54-9a1a-7d987abe8f9b/deploy-status)](https://app.netlify.com/sites/quizzical-babbage-45160a/deploys)

<h1 align="center">
  Sidebar Docs Gatsby starter
</h1>

This gatsby starter features a sidebar that allows for documentation or pages
reasonably organized into sections or sub-menus. It also features typescript
support, MDX, theming with [rebass.js](https://rebassjs.org/), and
[netlify-cms](https://www.netlifycms.org/).

In broad strokes:

- `/content/pages` holds pages that will appear in the sidebar TOC. These pages
  can be nested 1 level deep. The mdx pages currently use 2 special fields in
  the mdx/markdown frontmatter:
  - `collectionName` should be `pages`. This is set automatically by
    netlify-cms.
  - `ordering` is a number (int or float) and determines sorting of a given
    collection in the sidebar.
  - `/src/components/Nav/directory.js` is just a mapping of names for nav
    sections. The keys in these sections should match the folder containing your
    mdx files - in this starter `section-one: "Section One` matches files in
    `/content/pages/section-one`.
- `/content/blog` could hold something else.
