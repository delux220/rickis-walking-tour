import React, {useState, useEffect} from "react"
import {Link, Script, navigate, useStaticQuery, graphql} from 'gatsby';

export default function Seo({lang='en'}) {

	const data = useStaticQuery(graphql`
	   query MyQuery {
		  strapiSeo {
		    Title
		    Image {
		      url
		    }
		    Description
		    localizations {
		      data {
		        attributes {
		          Title
		          Description
		          locale
		        }
		      }
		    }
		  }
		}
	  `);

	const title = lang=='en'?data.strapiSeo.Title:data.strapiSeo.localizations.data.find(local => local.attributes.locale==lang).attributes.Title;
	const description = lang=='en'?data.strapiSeo.Description:data.strapiSeo.localizations.data.find(local => local.attributes.locale==lang).attributes.Description;

	return <>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      
        <meta property="og:image" content={data.strapiSeo.Image.url}/>
      
      
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
}