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
      Photo: Node
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

    type strapiSocialMedia implements Node {
      Facebook: String,
      Instagram: String,
      YouTube: String
    }

    type strapiPost implements Node {
      Title: String!
      Description: String
      Content: String!
      Image: Node
      Slug: String!
    }

    type strapiBlog implements Node {
      Title: String!
      Description: String
      Image: Node
      AboutAuthor: Node
    }

    type strapiConcierge implements Node {
      Title: String!
      Content: String!
      Description: String
      Image: Node!
    }

    type Medium implements Node {
      url: String
    }

    type Format implements Node {
      medium: Medium
    }

    type Photo implements Node {
      alternativeText: String
      url: String!
      formats: Format
    }

    type strapiGallery implements Node {
      Photos: [Photo]
      Title: String!
      Description: String!
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
  const heBlogPost = path.resolve(`./src/templates/post.he.js`);
  const blog = path.resolve(`./src/templates/blog.js`);
  const heBlogTemplate = path.resolve(`./src/templates/blog.he.js`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
  query MyQuery {
    strapiSocialMedia {
      Instagram
      Facebook
      YouTube
    }
    allStrapiBlog {
      nodes {
        id
        locale
        Description
        Title
        Image {
          alternativeText
          url
        }
        AboutAuthor {
          Title
          Description
          Photo {
            alternativeText
            url
            formats {
              medium {
                url
              }
            }
          }
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
          locale
          Image {
            url
            alternativeText
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
          Description
          Title
          publishedAt
          updatedAt
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

  const enPosts = result.data.allStrapiPost.edges.filter(edge => edge.node.locale=='en');
  const hePosts = result.data.allStrapiPost.edges.filter(edge => edge.node.locale=='he-IL');

  const enBlog = result.data.allStrapiBlog.nodes.find(node => node.locale=='en');
  const heBlog = result.data.allStrapiBlog.nodes.find(node => node.locale=='he-IL');

  console.log(heBlog);

  //console.log(enPosts);

  enPosts.forEach((edge, i) => {
    console.log(`/posts/${edge.node.Slug}`);
    var nextPost = enPosts[i+1]?enPosts[i+1]:null;
    createPage({
      path: `/posts/${edge.node.Slug}`,
      component: blogPost,
      context: {
        data: edge.node,
        nextPost,
        author: enBlog.AboutAuthor,
        social: result.data.strapiSocialMedia
      }
    });
  });

  hePosts.forEach((edge, i) => {
    console.log(`/he/posts/${edge.node.Slug}`);
    var nextPost = hePosts[i+1]?hePosts[i+1]:null;
    createPage({
      path: `/he/posts/${edge.node.Slug}`,
      component: heBlogPost,
      context: {
        data: edge.node,
        nextPost,
        author: heBlog.AboutAuthor,
        social: result.data.strapiSocialMedia
      }
    });
  });

  const enChunks = chunk(enPosts, 4);
  const heChunks = chunk(hePosts, 4);

  if (enChunks.length == 0) {
    createPage({
      path: '/blog',
      component: blog,
      context: {
        data: [],
        blog: enBlog,
        page: 1,
        hasMore: false,
        title: enBlog.Title,
        uri: '/blog'
      }
    });
  } else {
    enChunks.forEach((chunk, i) => {
      let uri = i==0?'/blog':`/blog/${(i+1)}`;
      createPage({
        path: uri,
        component: blog,
        context: {
          data: chunk,
          page: (i+1),
          blog: enBlog,
          hasMore: (i<(enChunks.length-1)),
          title: enBlog.Title,
          uri: uri
        }
      });
    });
  }

  if (heChunks.length == 0) {
    createPage({
      path: '/he/blog',
      component: heBlogTemplate,
      context: {
        data: [],
        page: 1,
        blog: heBlog,
        hasMore: false,
        title: heBlog.Title,
        uri: '/blog'
      }
    });
  } else {
    heChunks.forEach((chunk, i) => {
      let uri = i==0?'/he/blog':`/he/blog/${(i+1)}`;
      createPage({
        path: uri,
        component: heBlogTemplate,
        context: {
          data: chunk,
          blog: heBlog,
          page: (i+1),
          hasMore: (i<(heChunks.length-1)),
          title: heBlog.Title,
          uri: uri
        }
      });
    });
  }

}