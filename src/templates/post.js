import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

// Utilities
import kebabCase from "lodash/kebabCase"


export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
    <SEO title={frontmatter.title} />
    <div className="blog-post">
      <h1>{frontmatter.title}</h1>
      <h2>by: <Link to={`/author/${kebabCase(frontmatter.author)}/`}>{frontmatter.author}</Link>, {frontmatter.date}</h2>
     
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
   
      
    </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MM/DD/YYYY")
        path
        author
        title
      }
    }
  }
`