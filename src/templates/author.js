import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
// Components
import { Link, graphql } from "gatsby"
const PostsOfAuthor = ({ pageContext, data }) => {
  const { author } = pageContext
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <h1>{author}</h1>
      <h2>Articles:</h2>
      <ul>
        {edges.map(({ node }) => {
          const { title, path } = node.frontmatter
          return (
            <li key={title}>
              <Link to={path}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
PostsOfAuthor.propTypes = {
  pageContext: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default PostsOfAuthor


export const pageQuery = graphql`
  query($author: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $author} } } 
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            path  
            title
          }
        }
      }
    }
  }
`