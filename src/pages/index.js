import React, {useState, useEffect, useRef} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faEnvelope, faStar, faStarEmpty} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Loader } from "@googlemaps/js-api-loader"

const callback = function(entries) {
  entries.forEach(entry => {

    // Is the element in the viewport ?
    if (entry.isIntersecting) {

      // Add the fadeIn class:
      entry.target.classList.add("motion-safe:animate-fadeIn");
    } else {

      // Otherwise remove the fadein class
      //entry.target.classList.remove("motion-safe:animate-fadeIn");
    }
  });
};

const IndexPage = ({data}) => {

	const [place, setPlace] = useState(null);

	const [reviews, setReviews] = useState([]);

	const mapRef = useRef();

	useEffect(() => {
		const loader = new Loader({
		  apiKey: process.env.GATSBY_PLACES_API_KEY,
		  version: "weekly"
		});

		loader.load().then(async() => {
			const {PlacesService} = await window.google.maps.importLibrary("places");
			//console.log(PlacesService);

			var request = {
			  placeId: 'ChIJlaAiaDy8UmoRw_KA3DQqFLs',
			  fields: ['reviews', 'url', 'rating', 'user_ratings_total'],
			  reviews_sort: 'most_relevant'
			};

			var service = new PlacesService(document.createElement('div'));

			service.getDetails(request, (place, status) => {
				if (status == window.google.maps.places.PlacesServiceStatus.OK) {
				    setPlace(place);



				}
			});
		});

		


	}, []);

	const rating = [];

	if (place != null) {
		for(var i = 0; i < place.rating; i++ ) {
			rating.push(<FontAwesomeIcon icon={faStar} className="text-amber-400"/>);
		}

		for(var i = place.rating; i < 5; i++ ) {
			rating.push(<FontAwesomeIcon icon={faStar} className="text-gray-300"/>);
		}

	}

	useEffect(() => {
		const targets = document.querySelectorAll(".on-scroll");

	    // Set up a new observer
	    const observer = new IntersectionObserver(callback);

	    // Loop through each of the target
	    targets.forEach(function(target) {
	      // Hide the element
	      target.classList.add("opacity-0");

	      // Add the element to the watcher
	      observer.observe(target);
	    });
	}, [place])

	
	
	return <Layout lang={'en'}>
		<section className="bg-cover relative bg-center h-[90vh] md:hidden bg-[url(https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg)]">
			<div className="absolute w-full bottom-0  from-teal-300 via-transparent to-transaprent px-0">
				<h1 className="text-center font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll" >Hey<span className="translate-y-4 inline-block">,</span> I'm Ricki!</h1>
				<h3 className=" font-goodlife text-white text-center font-bold text-2xl mb-3 uppercase font-bold on-scroll">Your Guide to NYC</h3>
				<div className="space-y-2 mb-8 px-10">
				<button className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 text-white text-center block w-full rounded-full px-10 py-3 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Book a Tour</button>
				<a href="/#contact" className="font-bold font-sans border bg-white border-white bg-white text-black rounded-full px-10 py-3 text-center block w-full"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>Contact Me</a>
				</div>
			</div>
		</section>
		<section className="bg-white hidden md:block">
		<div className=" bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684213143/skyline_adobe_express_vuebrw.svg)]">
		<div className="container mx-auto h-[90vh] px-4 md:px-0 lg:px-6 py-10 xl:py-6 flex items-center space-x-8 xl:space-x-10  ">

			<img src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg" className="border-8 h-full shadow-xl border-white -rotate-2 motion-safe:animate-fadeIn"/>
			<div className="">
				<h1 className="font-epicursive text-black font-bold text-7xl mb-8 mx-auto on-scroll" >Hey<span className="translate-y-4 inline-block">,</span> I'm Ricki!</h1>
				<h3 className=" font-goodlife text-teal-900 font-bold text-3xl mb-4 uppercase font-bold ">Your Guide to NYC</h3>
				<h3 className=" text-teal-900  text-lg font-sans mb-4 block xl:max-w-lg">I'm a photographer 📷, licensed NYC tour guide 🗽, part-time stand up comedian 🎤, and full-time adventurer!</h3>
				<button className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 mb-2 lg:mb-0 text-white rounded-full px-10 py-4 block w-full lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Book a Tour</button>
				<a href="/#contact" className="font-bold font-sans border bg-white border-black text-black rounded-full px-10 py-4 block w-full text-center lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>Contact Me</a>
			</div>
		</div>
		</div>
		</section>
		<section className="bg-ricki py-20" id="tours">
			<div className="container mx-auto px-6 ">
			<h2 className="mb-20 text-5xl text-center md:text-left text-white font-bold font-goodlife">My Tours</h2>
			<div className="sm:grid xl:grid-cols-6 gap-8 xl:gap-10">
				{
					data.allStrapiTour.nodes.map(tour => {

						return <div key={`tour-${tour.id}`} className="md:flex space-x-4 on-scroll mb-6 sm:mb-0  xl:col-span-5">
							
							{tour.Photo.formats.medium!=null?<img src={tour.Photo.formats.medium.url} className=" rounded-full mb-4 lg:mb-0 w-full md:w-64 md:h-64 aspect-square lg:w-72 lg:h-72 border-white border-8" />:<img src={tour.Photo.url} className=" md:w-64 md:h-64 rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-72 lg:h-72 border-white border-8" />}

							<div className="">
								<h3 className=" font-bold text-2xl xl:text-3xl font-goodlife text-white mb-1">{tour.Title}</h3>
								<div className="flex items-center space-x-1 text-teal-900 font-bold">
									
									<span className="text-white text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.Price).format('$0,0.00')}</span>
									<span>&middot;</span>
									<span className="text-white text-sm sm:text-base md:text-lg font-bold">{tour.Duration} {tour.Duration==1?'hr':'hrs'}</span>
									{
										tour.Private==true?<>
											<span>&middot;</span>
											<span className="text-white text-sm sm:text-base md:text-lg font-bold">Private Tour {tour.MinimumSize>1&&`(min. ${tour.MinimumSize} ppl)`}</span>
										</>:
										<>
											<span>&middot;</span>
											<span className="text-white text-sm sm:text-base md:text-lg font-bold">Public Tour</span>
										</>
									}
								</div>
								<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-2 inline-block"/>
								<div className="">
								<p className="text-white/80 mb-4 xl:text-lg" dangerouslySetInnerHTML={{__html: tour.Description.replaceAll("\n", '<br/>')}}/>
								</div>
									<a href={tour.Link} className="w-full md:w-auto md:inline-block text-xl sm:text-base font-bold font-sans bg-rose-400 shadow-lg text-white rounded-full px-6 py-2 block text-center"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Book Tour</a>

							</div>
							
						</div>})
				}
				</div>
			</div>
		</section>
		<section className="bg-ricki">
			<div className="rounded-lg px-6  container mx-auto py-8 md:py-20">
				<div className="md:grid grid-cols-2 gap-4">
					<div className="flex lg:hidden on-scroll items-center">
					<img src="https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg" className="w-full"/>
					</div>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg)]  bg-no-repeat bg-top-left w-full md:h-128 border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					<div className=" lg:px-8 py-6 on-scroll">
						<h3 className="text-white text-4xl font-bold font-goodlife">Destination Photography</h3>
						<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-3"/>
						<h5 className="font-goodlife text-white text-lg font-bold mb-1">Why Take Pictures With Me?</h5>
						<p className="text-white/80 xl:text-lg mb-4">If you hate taking pictures, if you find yourself frozen infront of the camera, if you need someone cool to pretend you're not about to propose, I'm your gal. In addition to having a top notch photography equipment I'm also a director and a great ice breaker so we can get you to look in your own element as soon as the first photo. Before the session we go over wardrobe options, figure out the best location & get to know each other so we can have fun during the photoshoot. I'm a NYC local, also work as a tour guide & familiar with the best spots around town. You will learn the history as we take your fabulous photos :D</p>
						<form ariaLive="polite" dataUx="Form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
						<input type="hidden" name="edit_selector" data-aid="EDIT_PANEL_EDIT_PAYMENT_ICON"/>
						<input type="hidden" name="business" value="thinkpink007@gmail.com"/>
						<input type="hidden" name="cmd" value="_xclick"/>
						<input type="hidden" name="item_name" value="PICK YOUR LOCATION"/>
						<input type="hidden" name="item_number"/>
						<input type="hidden" name="amount" value="300.00" data-aid="PAYMENT_HIDDEN_AMOUNT"/>
						<input type="hidden" name="shipping" value="0.00"/>
						<input type="hidden" name="currency_code" value="USD" dataAid="PAYMENT_HIDDEN_CURRENCY"/>
						<input type="hidden" name="rm" value="0"/>
						<input type="hidden" name="return" value="https://rickiswalkingtours.com/"/>
						<input type="hidden" name="cancel_return" value="https://rickiswalkingtours.com/"/>
						<input type="hidden" name="cbt" value="Return to Ricki's Walking Tours"/>
							<div className="flex items-center space-x-4">
								<Link to="/photography"  className="px-6 py-2 bg-rose-400 shadow-lg text-white rounded-full font-bold inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Photography Services</Link>
								
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>

		{place!=null&&<section id="reviews" className="bg-rose-400 ">
			<div className="container mx-auto pt-20 xl:pt-32 px-6">

				<h3 className="text-white on-scroll text-center text-4xl sm:text-5xl font-bold font-goodlife mb-1">Reviews for Ricki</h3>

				<div className="text-center on-scroll mb-8">
					<div className="text-2xl">
						{rating}
					</div>
					<a href={place.url} className="text-white hover:underline">{numeral(place.user_ratings_total).format('0,0')} total reviews</a>

				</div>


				<div className="md:columns-2 lg:columns-3 pb-20">
					{
						place.reviews.map(review => {
							const stars = [];
							const emptyStars = [];

							for(var i = 0; i < review.rating; i++ ) {
								stars.push(<FontAwesomeIcon icon={faStar} className="text-amber-400"/>);
							}

							for(var i = review.rating; i < 5; i++ ) {
								emptyStars.push(<FontAwesomeIcon icon={faStar} className="text-gray-300"/>);
							}

							return <div className="on-scroll mb-4  shadow-xl inline-block bg-white px-4 py-4 rounded-xl" key={`review-${review.author_name.replace(' ', '-')}`}>
								<div className="text-center mb-4">
									{stars}
									{emptyStars}

								</div>
								<p className="mb-3 text-sm">{review.text}</p>

								<div className="flex items-center space-x-3">
									<img src={review.profile_photo_url} className="w-10 h-10"/>
									<div >
										
											<span className="block font-bold text-slate-900">{review.author_name}</span>
											<small className="block text-gray-500">{review.relative_time_description}</small>
										
									</div>
								</div>
							</div>}
							)
					}
			</div>
			</div>
		</section>}
		<section className="bg-rose-400 pt-8 pb-12 md:py-20"  id="contact">
			<div className="container mx-auto px-6">
				<div className="lg:grid grid-cols-2 gap-10 xl:gap-12 space-y-20 lg:space-y-0">
					<div className="on-scroll">
						<h3 className="text-white text-4xl font-bold font-goodlife">Have Questions? Contact me!</h3>
												<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-3"/>

						<form>
							<div className="space-y-3">
								<div>
									<label className="block text-white text-sm font-bold">Name *</label>
									<input type="text" className="bg-white rounded-md px-4 py-2 w-full block" />
								</div>
								<div>
									<label className="block text-white text-sm font-bold">Email Address *</label>
									<input type="email" className="bg-white rounded-md px-4 py-2 w-full block" />
								</div>
								<div className="sm:grid grid-cols-2 gap-4 space-y-3 sm:space-y-0">
									<div>
										<label className="block text-white text-sm font-bold">Requested Tour Date(s)</label>
										<input type="email" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
									<div>
										<label className="block text-white text-sm font-bold">Number of Guests</label>
										<input type="number" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
								</div>
								<div className="">
									<label className="block text-white text-sm font-bold">Message *</label>
									<textarea rows={4} className="bg-white rounded-md px-4 py-2 w-full block" placeholder="What tour are you interested in? Do you have a special request?"></textarea>
								</div>
								<button className="on-scroll font-bold font-sans border border-black bg-black mr-4 text-white text-center block w-full sm:w-auto rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Send Message</button>

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
      Private
      MinimumSize
      Link
      locale
      Price
      Title
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

export const Head = () => <Seo/>

export default IndexPage;