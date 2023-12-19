import React, {useState, useEffect} from "react"
import {Link, Script, navigate, useStaticQuery, graphql} from 'gatsby';

export default function Seo({lang, location, title=null, description=null, page=null}) {

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
		  blogHebrew: strapiBlog(locale: {eq: "he-IL"}) {
		    Title
		    Description
		  }
		  strapiBlog {
		    Title
		    Description
		  }
		  strapiAboutPage {
		    localizations {
		      data {
		        attributes {
		          SeoDescription
		          SeoTitle
		        }
		      }
		    }
		    SeoTitle
		    SeoDescription
		  }
		  photographyHebrew: strapiDestinationPhotography(locale: {eq: "he-IL"}) {
		    SeoDescription
		    SeoTitle
		  }
		  strapiDestinationPhotography {
		    SeoTitle
		   	SeoDescription
		  }

		  strapiConcierge {
		    SeoTitle
		    Description
		    localizations {
		      data {
		        attributes {
		          SeoTitle
		          Description
		        }
		      }
		    }
		  }
		}
	  `);


	console.log(data);

	
	var localization = data.strapiSeo.localizations.data.find(local => local.attributes.locale == lang);


	var _title = localization?localization.attributes.Title:data.strapiSeo.Title;
	var _description = localization?localization.attributes.Description:data.strapiSeo.Description;

	if (title != null) {
		_title = title;
	}
	if (description != null) {
		_description = description;
	}

	var data2 = null;

	
	if (page != null) {
		switch(page) {
			case 'blog':
				if (lang == 'he-IL') {
					_title = data.blogHebrew.strapiBlog.Title;
					_description = data.blogHebrew.strapiBlog.Description;
				} else {
					_title = data.strapiBlog.strapiBlog.Title;
					_description = data.strapiBlog.strapiBlog.Description;
				}

				break;
			case 'about':
				
				if (lang == 'he-IL') {
					localization = data.strapiAbout.localizations.data.find(local => local.locale=='he-IL');

					_title = localization?localization.SeoTitle:data.strapiAboutPage.SeoTitle;
					_description = localization?localization.SeoDescription:data.strapiAboutPage.SeoDescription;
				} else {
					_title = data.strapiAbout.strapiAboutPage.SeoTitle;
					_description = data.strapiAbout.strapiAboutPage.SeoDescription;

				}
				
				break;
			case 'photography':
				if (lang == 'he-IL') {
					_title = data.photographyHebrew.strapiDestinationPhotography.SeoTitle;
					_description = data.photographyHebrew.strapiDestinationPhotography.SeoDescription;
				} else {
					_title = data.strapiDestinationPhotography.SeoTitle;
					_description = data.strapiDestinationPhotography.SeoDescription;
				}

				
				
				
				break;
			case 'concierge':
				

				if (lang == 'he-IL') {
					localization = data.strapiConcierge.localizations.data.find(local => local.locale=='he-IL');

					_title = localization?localization.SeoTitle:data.strapiConcierge.SeoTitle;
					_description = localization?localization.Description:data.strapiConcierge.Description;
				} else {
					_title = data.strapiConcierge.SeoTitle;
					_description = data.strapiConcierge.Description;

				}
				break;
		}
	}

	/*if (location.pathname == '/concierge') {
		title = data.strapiConcierge.Title;
		description = data.strapiConcierge.Description;
	} else if (location.pathname == '/he/concierge') {
		title = data.strapiConcierge.localization.data.attributes.Title;
		description = data.strapiConcierge.localization.data.attributes.Description;
	}*/

	const _pathName = location.pathname.replace('/he', '');

	return <>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="alternate" hreflang="he-IL" href={`https://rickiswalkingtours.com/he${_pathName}`} />
      <link rel="alternate" hreflang="en-US" href={`https://rickiswalkingtours.com${_pathName}`} />
      	
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      
        <meta property="og:image" content={data.strapiSeo.Image.url}/>
      
      
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
}