const path = require(`path`)
const _ = require("lodash")
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const authorTemplate = path.resolve("src/templates/author.js")

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            frontmatter {
              author
              path
            }
          }
        }
      }
      authorsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___author) {
          fieldValue
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  // Extract post data from query
  const posts = result.data.posts.edges;

  // Make 'post' pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    })
  })

  // Extract author data from query
  const authors = result.data.authorsGroup.group;

  // Make 'author' pages
  authors.forEach(author => {
    createPage({
      path: `/author/${_.kebabCase(author.fieldValue)}/`,
      component: authorTemplate,
      context: {
        author: author.fieldValue,
      },
    })
  })  
}