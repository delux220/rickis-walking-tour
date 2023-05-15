import React, {useState, useEffect} from "react"
import {Link, Script, navigate, useStaticQuery, graphql} from 'gatsby';

export default function Seo({lang='en'}) {



	const data = useStaticQuery(graphql`
	   query seoQuery {
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

	const test = data.strapiSeo.localizations.data.find(local => (local.attributes.locale==lang));

	console.log(test);

	console.log(data.strapiSeo.localizations);

	const title = lang=='en'?data.strapiSeo.Title:data.strapiSeo.localizations.data.find(local => (local.attributes.locale==lang));
	const description = lang=='en'?data.strapiSeo.Description:data.strapiSeo.localizations.data.find(local => (local.attributes.locale==lang));

	return <>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <title>{title.attributes?title.attributes.Title:title}</title>
      <meta name="description" content={description.attributes?description.attributes.Description:description} />
      <meta property="og:title" content={title.attributes?title.attributes.Title:title} />
      <meta property="og:description" content={description.attributes?description.attributes.Description:description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      
        <meta property="og:image" content={data.strapiSeo.Image.url}/>
      
      
      <meta name="twitter:title" content={title.attributes?title.attributes.Title:title} />
      <meta name="twitter:description" content={description.attributes?description.attributes.Description:description} />
    </>
}