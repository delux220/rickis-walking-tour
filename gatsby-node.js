const path = require(`path`)
const moment = require('moment');

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `

    type strapiTour implements Node {
      Link: String!
      Title: String!
      Description: String!
      Price: Float!
      Duration: Float!
      Photo: Node!
      MinimumSize: Float
      Private: Boolean
      PriceUnder18: Float
    }

    type strapiDestinationPhotography implements Node {
      Title: String
      Description: String
      Price: Float
      PriceList: [Node]
    }

    type strapiPost implements Node {
      Title: String!
      Content: String!
      Image: Node
      Slug: String!
    }
    
  `
  createTypes(typeDefs);
}

function chunk(array, chunkSize) {
  let chunks = [];
  
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  
  return chunks;
}

exports.createPages = async ({ graphql, actions, reporter }) => {



  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/post.js`);
  const blog = path.resolve(`./src/templates/blog.js`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
  query MyQuery {
    strapiBlog {
      Title
      AboutAuthor {
        Title
        Description
        Photo {
          url
        }
      }
    }
    allStrapiPost(sort: {publishedAt: DESC} ) {
      edges {
        node {
          id
          Content {
            data {
              Content
            }
          }
          Image {
            url
            formats {
              medium {
                url
              }
              large {
                url
              }
            }
          }
          Slug
          Title
          publishedAt
        }
      }
    }
  }
  `);




  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  console.log('title: '+result.data.strapiBlog.Title);
  console.log(result.data.strapiBlog.AboutAuthor);

  result.data.allStrapiPost.edges.forEach((edge, i) => {
    console.log(`/posts/${edge.node.Slug}`);
    var nextPost = result.data.allStrapiPost.edges[i+1]?result.data.allStrapiPost.edges[i+1]:null;
    createPage({
      path: `/posts/${edge.node.Slug}`,
      component: blogPost,
      context: {
        data: edge.node,
        nextPost,
        author: result.data.strapiBlog.AboutAuthor
      }
    });
  });

  const chunks = chunk(result.data.allStrapiPost.edges, 4);

  chunks.forEach((chunk, i) => {
    let uri = i==0?'/blog':`/blog/${(i+1)}`;
    createPage({
      path: uri,
      component: blog,
      context: {
        data: chunk,
        page: (i+1),
        hasMore: (i<(chunks.length-1)),
        title: result.data.strapiBlog.Title
      }
    });
  });

}