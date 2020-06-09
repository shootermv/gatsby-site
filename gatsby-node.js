const path = require(`path`)
const _ = require("lodash")
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const authorTemplate = path.resolve("src/templates/author.js")

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
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


  result.data.postsRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/post.js`),
    })
  })

  // Extract author data from query
  const authors = result.data.authorsGroup.group
  // Make tag pages
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