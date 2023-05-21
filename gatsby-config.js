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
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-sitemap",{
    resolve: 'gatsby-plugin-i18n',
    options: {        
      langKeyDefault: 'en',
      useLangKeyLayout: true,
      prefixDefault: false
    }
  },{
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    }]
};