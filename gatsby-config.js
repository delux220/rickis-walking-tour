require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [{
    singularName: 'tour',
    pluginOptions: {
      i18n: {
        locale: "all", // Fetch all localizations
      },
    }
  },{
    singularName: 'post',
    pluginOptions: {
      i18n: {
        locale: "all", // Fetch all localizations
      },
    },
    queryParams: {
      'populate': {
        'Image': '*'
      }
    }
  }],
  singleTypes: ['social-media', {
    singularName:'about-page',
    pluginOptions: {
      i18n: {
        locale: "all", // Fetch all localizations
      },
    }
  },
  {
    singularName:'blog',
    pluginOptions: {
      i18n: {
        locale: "all", // Fetch all localizations
      },
    },
    queryParams: {
      'populate': {
        'Image': {
          'populate': '*'
        },
        'AboutAuthor': {
          'populate' : '*'
        }
      }
    }
  },
    {
    singularName:'gallery',
    pluginOptions: {
      i18n: {
        locale: "all", // Fetch all localizations
      },
    }
  }, {
    singularName: 'destination-photography',
    pluginOptions: {
        i18n: {
          locale: "all", // Fetch all localizations
        },
      },
    queryParams: {
      'populate': {
        'PriceList': '*'
      }
    }
  }, 'seo'],
  remoteFileHeaders: {
    /**
     * Customized request headers
     * For http request with a image or other files need authorization
     * For expamle: Fetch a CDN file which has a security config when gatsby building needs
     */
    Referer: "https://rickiswalkingtours.com/",
    // Authorization: "Bearer eyJhabcdefg_replace_it_with_your_own_token",
  },
};

console.log(strapiConfig);
/*, {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    }*/

module.exports = {
  siteMetadata: {
    title: `Ricki's Walking Tours`,
    siteUrl: `https://rickiswalkingtours.com`
  },
  plugins: ["gatsby-plugin-postcss", {
    resolve: "gatsby-plugin-sitemap"
  },{
    resolve: 'gatsby-plugin-i18n',
    options: {        
      langKeyDefault: 'en',
      useLangKeyLayout: true,
      prefixDefault: false
    }
  },{
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ricki's Walking Tours`,
        short_name: `Ricki's Tours`,
        start_url: `/`,
        background_color: `#01a8c3`,
        theme_color: `#01a8c3`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/src/images/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/src/images/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          }
        ]
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `pages`,
        // Path to the directory
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        gtagConfig: {
          storage: 'none',
          client_storage: 'none'
        },
        trackingIds: [
          "G-8523ZZG1KV"
        ],
      },
    },
    
    ]
};