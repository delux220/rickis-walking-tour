import React, {useState, useEffect} from "react"
import {Link, Script, navigate, useStaticQuery, graphql} from 'gatsby';

export default function Seo({lang, location}) {

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


	
	const localization = data.strapiSeo.localizations.data.find(local => local.attributes.locale == lang);


	const title = localization?localization.attributes.Title:data.strapiSeo.Title;
	const description = localization?localization.attributes.Description:data.strapiSeo.Description;

	const _pathName = location.pathname.replace('/he', '');

	return <>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="alternate" hreflang="he-IL" href={`https://rickiswalkingtours.com/he${_pathName}`} />
      <link rel="alternate" hreflang="en-US" href={`https://rickiswalkingtours.com${_pathName}`} />
      	
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