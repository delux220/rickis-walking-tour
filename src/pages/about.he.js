import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faEnvelope, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';




const AboutPage = ({data}) => {
	const localization = data.strapiAboutPage.localizations.data.find(localization => localization.attributes.locale == 'he-IL');
	

	return <Layout lang={'he'}>
		<div className="bg-teal-300">
			<div className="border-b-4 border-white md:hidden relative h-[80vh] bg-cover bg-center" style={{backgroundImage: `url('${data.strapiAboutPage.Photo.formats.large.url}')`}}>
				<div className="absolute bottom-0 left-0 w-full px-6">
						<h1 className="text-right font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll">{localization.attributes.Title}</h1>
				</div>
			</div>
			<div className="container mx-auto px-6 xl:px-0 md:h-[90vh] flex items-center ">
				<div className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
					<div className="md:block hidden">
						<img src={data.strapiAboutPage.Photo.formats.large.url} className="md:block w-full border-8 border-white shadow-lg -rotate-3"/>
					</div>
					<div className="md:col-span-2 pt-5 md:pt-0 pb-20">
						<h1 className=" font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll text-right"></h1>
						<p className="text-lg on-scroll mb-4 text-right">{localization.attributes.Description}</p>
						<div className="text-right">
							<Link to={'/#tours'} className="text-white font-bold hover:underline"><FontAwesomeIcon icon={faArrowLeft}/> Book a tour with me!</Link>
						</div>
						<div className="on-scroll">
							<div className="items-center justify-end flex space-x-8 mt-6">
								<a href="#"><Facebook className="hover:fill-white fill-black w-10 h-10"/></a>
								<a href="#"><Instagram className="hover:fill-white fill-black w-10 h-10"/></a>
								<a href="#"><YouTube className="hover:fill-white fill-black w-10 h-10"/></a>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</Layout>
}

export const pageQuery = graphql`query MyQuery {
  strapiAboutPage {
    id
    Title
    Description {
      data {
        Description
      }
    }
    locale
    localizations {
      data {
        attributes {
          Description
          Title
          locale
        }
      }
    }
    Photo {
      formats {
        medium {
          url
        }
        large {
          url
        }
      }
      url
    }
  }
}`;

export default AboutPage;