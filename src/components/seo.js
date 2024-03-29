import React, {useState, useEffect} from "react"
import {Link, Script, navigate, useStaticQuery, graphql} from 'gatsby';

export default function Seo({lang, location, title=null, description=null, page=null}) {

	const data = useStaticQuery(graphql`
	   query seoQuery2 {
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

	
	if (page != null) {
		switch(page) {
			case 'blog':
				if (lang == 'he-IL') {
					_title = data.blogHebrew.Title;
					_description = data.blogHebrew.Description;
				} else {
					_title = data.strapiBlog.Title;
					_description = data.strapiBlog.Description;
				}

				break;
			case 'about':
				
				if (lang == 'he-IL') {
					localization = data.strapiAboutPage.localizations.data.find(local => local.locale=='he-IL');

					_title = localization?localization.SeoTitle:data.strapiAboutPage.SeoTitle;
					_description = localization?localization.SeoDescription:data.strapiAboutPage.SeoDescription;
				} else {
					_title = data.strapiAboutPage.SeoTitle;
					_description = data.strapiAboutPage.SeoDescription;

				}
				
				break;
			case 'photography':
				if (lang == 'he-IL') {
					_title = data.photographyHebrew.SeoTitle;
					_description = data.photographyHebrew.SeoDescription;
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

	console.log(_title);
	console.log(_description);

	const _pathName = location.pathname.replace('/he', '');

	return <>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="alternate" hreflang="he-IL" href={`https://rickiswalkingtours.com/he${_pathName}`} />
      <link rel="alternate" hreflang="en-US" href={`https://rickiswalkingtours.com${_pathName}`} />
      	
      <title>{_title}</title>
      <meta name="description" content={_description} />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      
        <meta property="og:image" content={data.strapiSeo.Image.url}/>
      
      
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:description" content={_description} />
    </>
}