import React, {useState, useEffect} from "react"
import {Link, graphql, Script} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';

const IndexPage = ({data}) => {

	return <Layout lang={"he"}>
		<section className="bg-cover relative bg-center h-[90vh] md:hidden bg-[url(https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg)]">
			<div className="absolute w-full bottom-0  from-teal-300 via-transparent to-transaprent px-0">
				<h1 className="text-center font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll" >אני ריקי</h1>
				<h3 className=" font-goodlife text-white text-center font-bold text-2xl mb-3 uppercase font-bold ">המדריכה שלכם לניו יורק סיטי</h3>
				<div className="space-y-2 mb-8 px-10">
				<button className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 text-white text-center block w-full rounded-full px-10 py-3 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>סיורים בעברית</button>
				<button className="font-bold font-sans border border-white bg-white text-black rounded-full px-10 py-3 text-center block w-full"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>צרו קשר</button>
				</div>
			</div>
		</section>
		<section className="bg-white hidden md:block">
		<div className=" bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1683537115/skyline_adobe_express_veyjus.svg)]">
		<div className="container mx-auto h-[90vh] px-6 py-20 flex items-center space-x-8 xl:space-x-10  ">

			<img src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg" className="border-8 h-full shadow-xl border-white -rotate-2 motion-safe:animate-fadeIn"/>
			<div className="">
				<h1 className="font-epicursive text-black font-bold text-7xl mb-8 mx-auto on-scroll" >אני ריקי</h1>
				<h3 className=" font-goodlife text-teal-900 font-bold text-3xl mb-4 uppercase font-bold ">המדריכה שלכם לניו יורק סיטי</h3>
				<h3 className=" text-teal-900  text-lg font-sans mb-4 block xl:max-w-lg">הצטרפו אלי לסימטאות מלאות ההיסטוריה של ניו יורק, לטעום מהמאכלים הטובים ביותר וליהנות מהעיר ללא הפסקה.</h3>
				<button className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 text-white rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>סיורים בעברית</button>
				<button className="font-bold font-sans border border-black text-black rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>צור קשר</button>
			</div>
		</div>
		</div>
		</section>
		<section className="bg-rose-300 py-20" id="tours">
			<div className="container mx-auto px-6">
			<h2 className="mb-20 text-5xl text-center md:text-right text-black font-bold font-goodlife">סיורים בעברית</h2>
			<div className="grid-cols-2 gap-8 space-y-8">
				{
					data.allStrapiTour.nodes.map(tour => {

						const hebrewVersion = tour.localizations.data.find(localization => localization.attributes.locale=='he-IL');

						if (!hebrewVersion) {
							return null;
						}

						return <div key={`tour-${tour.id}`} className="md:flex space-x-4 on-scroll mb-6 sm:mb-0">
							
							{tour.Photo.formats.medium!=null?<img src={tour.Photo.formats.medium.url} className="md:hidden rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-72 lg:h-72 border-white border-8" />:<img src={tour.Photo.url} className="md:hidden rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-64 lg:h-64 border-white border-8" />}

							<div className="text-right">
								<h3 className="text-right font-bold text-2xl font-goodlife text-black">{hebrewVersion.attributes.Title}</h3>
								<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer_lciuww.png" className="w-48 block my-3 inline-block"/>
								<p className="text-right text-teal-900 mb-4">{hebrewVersion.attributes.Description}</p>
								<a href={hebrewVersion.attributes.Link} className="w-full md:w-auto md:inline-block text-xl sm:text-base font-bold font-sans bg-rose-400 mr-4 shadow-lg text-white rounded-full px-6 py-2 block text-center"><FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>אני רוצה להזמין</a>
							</div>
							{tour.Photo.formats.medium!=null?<img src={tour.Photo.formats.medium.url} className="hidden md:block rounded-full mb-4 lg:mb-0 w-full aspect-square md:w-64 md:h-64 lg:w-72 lg:h-72 border-white border-8" />:<img src={tour.Photo.url} className="hidden md:block rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-64 lg:h-64 border-white border-8" />}

						</div>})
				}
				</div>
			</div>
		</section>
		<section className="bg-ricki">
			<div className="rounded-lg px-6  container mx-auto py-8 md:py-20">
				<div className="md:grid grid-cols-2">
					<img src="https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg" className="lg:hidden block on-scroll"/>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg)]  bg-no-repeat bg-top-left w-full md:h-128 border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					<div className=" lg:px-8 py-6 on-scroll">
						<h3 className="text-black text-4xl font-bold font-goodlife">Destination Photography</h3>
						<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer_lciuww.png" className="w-48 block my-3"/>
						<h5 className="font-goodlife text-black text-lg font-bold mb-1">Why Take Pictures With Me?</h5>
						<p className="text-teal-900 mb-4">If you hate taking pictures, if you find yourself frozen infront of the camera, if you need someone cool to pretend you're not about to propose, I'm your gal. In addition to having a top notch photography equipment I'm also a director and a great ice breaker so we can get you to look in your own element as soon as the first photo. Before the session we go over wardrobe options, figure out the best location & get to know each other so we can have fun during the photoshoot. I'm a NYC local, also work as a tour guide & familiar with the best spots around town. You will learn the history as we take your fabulous photos :D</p>
						<div className="flex items-center space-x-4">
						<button className="px-6 py-2 bg-rose-400 shadow-lg text-white rounded-full font-bold inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Purchase</button>
						<span className="font-bold text-black text-xl">$300</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section className="bg-ricki py-20">
			<div className="container mx-auto px-6">
				<div className="lg:grid grid-cols-2 gap-10 space-y-20 lg:space-y-0">
					
					<div className="on-scroll">
						<h3 className="text-black text-right text-4xl font-bold font-goodlife">שלחו הודעה ואחזור אליכם בהקדם</h3>
						<div className="text-right">
							<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer_lciuww.png" className="w-48 inline-block my-3"/>
						</div>
						<form>
							<div className="space-y-3 text-right">
								<div>
									<label className="block text-sm font-bold">* שם</label>
									<input name="name" type="text" dir="rtl" className="bg-white rounded-md px-4 py-2 w-full block" />
								</div>
								<div>
									<label className="block text-sm font-bold">* דוא"ל</label>
									<input name="email" dir="rtl" type="email" className="bg-white rounded-md px-4 py-2 w-full block" />
								</div>
								<div className="sm:grid grid-cols-2 gap-4 space-y-3 sm:space-y-0">
									<div>
										<label className="block text-sm font-bold">Requested Dates for Your Tour</label>
										<input type="text" dir="rtl" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
									<div>
										<label className="block text-sm font-bold">Number of Guests</label>
										<input type="number" dir="rtl" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
								</div>
								<div className="">
									<label className="block text-sm font-bold">* ההודעה שלך</label>
									<textarea rows={3} dir="rtl" className="bg-white rounded-md px-4 py-2 w-full block" placeholder="What tour are you interested in? Do you have a special request?"></textarea>
								</div>
								<button className="font-bold font-sans border border-black bg-black mr-4 text-white text-center block w-full sm:w-auto rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faArrowLeft} className="mr-4"/>Send Message</button>

							</div>
						</form>
					</div>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/h_1024,c_fill,q_auto/rs_w_1160_h_1449_y7wrsr.jpg)] bg-no-repeat lg:bg-[right_-9rem_top] xl:bg-[right_-5rem_top] w-full border-8 border-white shadow-xl ">
						&nbsp;
					</div>
				</div>
			</div>
		</section>
	</Layout>
}

export const pageQuery = graphql`query MyQuery {
  allStrapiTour {
    nodes {
      id
      Description
      Duration
      Link
      locale
      Price
      Title
      localizations {
        data {
          attributes {
            locale
            Description
            Duration
            Link
            Price
            Title
          }
        }
      }
      Photo {
      	url
        formats {
          medium {
            url
          }
        }
      }
    }
  }
}`;


export const Head = () => <Seo lang="he-IL"/>

export default IndexPage;