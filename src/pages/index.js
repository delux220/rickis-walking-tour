import React, {useState, useEffect, useRef} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton, WhatsApp} from '../components/index';
import {faArrowRight, faEnvelope, faStar, faStarEmpty, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Loader } from "@googlemaps/js-api-loader"
import ReCAPTCHA from "react-google-recaptcha";

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

	const [captcha, setCaptcha] = useState(false);

	const [captcha2, setCaptcha2] = useState(false);

	const [showMessage, setShowMessage] = useState(false);

	const [showMessage2, setShowMessage2] = useState(false);

	const [selectedTour, setSelectedTour] = useState(null);

	const numGuestsRef2 = useRef();

	const tourDateRef2 = useRef();

	const [error, setError] = useState(false);

	const [error2, setError2] = useState(false);

	const [disabled, setDisabled] = useState(false);
	const [disabled2, setDisabled2] = useState(false);

	const nameRef = useRef();

	const emailRef = useRef();

	const messageRef = useRef();

	const nameRef2 = useRef();

	const emailRef2 = useRef();

	const messageRef2 = useRef();

	const mapRef = useRef();

	const formRef = useRef();
	const formRef2 = useRef();

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

	const submitForm = (e) => {
		e.preventDefault();

        setShowMessage(false);
        setError(false);


        const email = emailRef.current.value;

        const name = nameRef.current.value;

        const message = messageRef.current.value;

        if (name.length == 0 || email.length == 0 || message.length == 0) {
          setError('Please complete the required (*) fields');
          return false;
        }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setError('Please enter a valid email');
          return false;
        } else if (captcha == false) {
          setError('Could not send message...');
          return false;
        }

        setDisabled(true);

        const myForm = formRef.current;
        const formData = new FormData(myForm);



        formData.append('g-recaptcha-response', captcha);
        
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        }).then(() => {
          setShowMessage(true);
        }).catch((error) => {
          setDisabled(false);
        });

        return false
      };

      const submitTourRequest = (e) => {
		e.preventDefault();

        setShowMessage2(false);
        setError2(false);


        const email = emailRef2.current.value;

        const name = nameRef2.current.value;

        const message = messageRef2.current.value;

        if (name.length == 0 || email.length == 0 || message.length == 0) {
          setError('Please complete the required (*) fields');
          return false;
        }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setError('Please enter a valid email');
          return false;
        } else if (captcha2 == false) {
          setError('Could not send message...');
          return false;
        }

        setDisabled(true);

        const myForm = formRef2.current;
        const formData = new FormData(myForm);



        formData.append('g-recaptcha-response', captcha2);
        
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        }).then(() => {
          setShowMessage2(true);
        }).catch((error) => {
          setDisabled2(false);
        });

        return false
      };

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
	
	
	return <Layout lang={'en'} footerClass="bg-rose-400">
		<section className="bg-cover relative bg-center h-[90vh] md:hidden bg-[url(https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg)]">
			<div className="absolute w-full bottom-0  px-0">
				<h1 className="text-center font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll" >Hey<span className="translate-y-4 inline-block">,</span> I'm Ricki!</h1>
				<h3 className=" font-goodlife text-white text-center font-bold text-2xl mb-3 uppercase font-bold on-scroll">Your Guide to NYC</h3>
				<div className="space-y-2 mb-8 px-6">
				<a href="#tours" className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 text-white text-center block w-full rounded-full px-10 py-3 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Book a Tour</a>
				<a href="/#contact" className="font-bold font-sans border bg-white border-white bg-white text-black rounded-full px-10 py-3 text-center block w-full"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>Contact Me</a>
				</div>
			</div>
		</section>
		<section className="bg-white hidden md:block">
		<div className=" bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684490282/skyline-new_jxaw7j.png)]">
		<div className="container mx-auto h-[90vh] lg:h-[80vh] px-4 md:px-0 lg:px-6 py-10 xl:py-6 flex items-center space-x-8 xl:space-x-10  ">

			<img src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg" className="border-8  rounded-xl h-full shadow-xl border-white -rotate-2 motion-safe:animate-fadeIn"/>
			<div className="">
				<h1 className="font-epicursive text-black font-bold text-7xl mb-8 mx-auto on-scroll" >Hey<span className="translate-y-4 inline-block">,</span> I'm Ricki!</h1>
				<h3 className=" font-goodlife text-teal-900 font-bold text-3xl mb-4 uppercase font-bold ">Your Guide to NYC</h3>
				<h3 className=" text-teal-900  text-lg font-sans mb-4 block xl:max-w-lg">I'm a photographer 📷, licensed NYC tour guide 🗽, part-time stand up comedian 🎤, and full-time adventurer!</h3>
				<a href="#tours" className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 mb-2 lg:mb-0 text-white rounded-full px-10 py-4 block w-full lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Book a Tour</a>
				<a href="/#contact" className="font-bold font-sans border bg-white border-black text-black rounded-full px-10 py-4 block w-full text-center lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>Contact Me</a>
			</div>
		</div>
		</div>
		</section>
		<section className="bg-ricki py-20" id="tours">
			<div className="container mx-auto px-5 sm:px-6 ">
			<h2 className="mb-20 text-5xl text-center md:text-left text-white font-bold font-goodlife">My Tours</h2>
			<div className="sm:grid xl:grid-cols-6 gap-8 xl:gap-10">
				{
					data.allStrapiTour.nodes.map(tour => {

						return <div key={`tour-${tour.id}`} className="md:flex md:space-x-4 on-scroll mb-6 sm:mb-0  xl:col-span-5">
							
							{tour.Photo.formats.medium!=null?<img src={tour.Photo.formats.medium.url} className="object-cover  rounded-full mb-4 lg:mb-0 w-full md:w-64 md:h-64 aspect-square lg:w-72 lg:h-72 border-white border-8" />:<img src={tour.Photo.url} className="object-cover  md:w-64 md:h-64 rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-72 lg:h-72 border-white border-8" />}

							<div className="">
								<h3 className=" font-bold text-2xl xl:text-3xl font-goodlife text-white mb-1">{tour.Title}</h3>
								<div className="flex flex-wrap sm:flex-no-wrap items-center space-x-1 text-teal-400 font-bold">
									
									<span className="text-white text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.Price).format('$0,0.00')} / {tour.id==3?'couple':'person'}</span>
									{
										tour.PriceUnder18!=null&&tour.PriceUnder18!=''&&<>
											<span className="">&middot;</span>
											<span className="text-white text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.PriceUnder18).format('$0,0.00')} / Under 18</span>
										</>
									}
									<span className="">&middot;</span>
									<span className="text-white text-sm sm:text-base md:text-lg font-bold">{tour.Duration} {tour.Duration==1?'hr':'hrs'}</span>
									{
										tour.Private==true?<>
											<span className="">&middot;</span>
											<span className="text-white text-sm sm:text-base md:text-lg font-bold">Private {tour.MinimumSize>1&&`(min. ${tour.MinimumSize} ppl)`}</span>
										</>:
										<>
											<span className="">&middot;</span>
											<span className="text-white text-sm sm:text-base md:text-lg font-bold">Public Tour</span>
										</>
									}
								</div>
								<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-2"/>
								<div className="">
								<p className="text-white/80 mb-4 xl:text-lg" dangerouslySetInnerHTML={{__html: tour.Description.replaceAll("\n", '<br/>')}}/>
								</div>
									{tour.Private==false?<a href={tour.Link} className="w-full md:w-auto md:inline-block text-xl sm:text-base font-bold font-sans bg-rose-400 shadow-lg text-white rounded-full px-6 py-2 block text-center"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Book Tour</a>:
									<button onClick={() => setSelectedTour(tour)} className="w-full md:w-auto md:inline-block text-xl sm:text-base font-bold font-sans bg-rose-400 shadow-lg text-white rounded-full px-4 sm:px-6 py-2 block text-center"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Book Private Tour</button>}

							</div>
							
						</div>})
				}
				</div>
			</div>
		</section>
		<section className="bg-ricki">
			<div className="rounded-lg px-6  container mx-auto py-8 md:py-20">
				<div className="md:grid grid-cols-2 gap-4">
					<div className="flex lg:hidden on-scroll items-center 3xl:gap-12 2xl:flex">
					<img src="https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg" className="w-full"/>
					</div>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg)] rounded-xl bg-no-repeat bg-top-left w-full md:min-h-[520px]  bg-white 2xl:hidden border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					<div className=" lg:px-8 py-6 on-scroll">
						<h3 className="text-white text-4xl font-bold font-goodlife">{data.strapiDestinationPhotography.Title}</h3>
						<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-3"/>
						<h5 className="font-goodlife text-white text-lg font-bold mb-1">Why Take Pictures With Me?</h5>
						<p className="text-white/80 xl:text-lg mb-4" dangerouslySetInnerHTML={{__html: data.strapiDestinationPhotography.Description.data.Description.replaceAll("\n", '<br/>')}}/>
						
						<div className="flex items-center space-x-4">
							<Link to="/photography"  className="px-6 py-2 bg-rose-400 shadow-lg text-white rounded-full font-bold block text-center w-full sm:w-auto sm:inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Photography Services</Link>
							
						</div>
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
												<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684323019/squiggle-black_desmmw.png" className="w-48 block my-3"/>

						<form name="contact" ref={formRef} netlify="true" onSubmit={submitForm}>
							<input type="hidden" name="form-name" value="contact"/>
							<div className="space-y-3">
								<div>
									<label className="block text-white text-sm font-bold">Name *</label>
									<input type="text" className="bg-white rounded-md px-4 py-2 w-full block" ref={nameRef} name="name" />
								</div>
								<div>
									<label className="block text-white text-sm font-bold">Email Address *</label>
									<input type="email" className="bg-white rounded-md px-4 py-2 w-full block" name="email" ref={emailRef}/>
								</div>
								<div className="sm:grid grid-cols-2 gap-4 space-y-3 sm:space-y-0">
									<div>
										<label className="block text-white text-sm font-bold">Requested Tour Date(s)</label>
										<input name="requested_tour_dates" type="text" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
									<div>
										<label className="block text-white text-sm font-bold">Number of Guests</label>
										<input name="number_of_guests" type="number" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
								</div>
								<div className="">
									<label className="block text-white text-sm font-bold">Message *</label>
									<textarea name="message" ref={messageRef} rows={4} className="bg-white rounded-md px-4 py-2 w-full block" placeholder="What tour are you interested in? Do you have a special request?"></textarea>
								</div>
								<div>
									<ReCAPTCHA
							            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
							            onChange={setCaptcha}
							          />
								</div>
								{
									error!=false&&<div><span className="text-white motion-safe:animate-fadeIn font-bold">{error}</span></div>
								}
								{
									showMessage!=false&&<div><span className="text-white motion-safe:animate-fadeIn font-bold">Thank you for your message! I'll be in touch.</span></div>
								}
								<div className="">
									<button type="submit" disabled={disabled||captcha==false} className="disabled:bg-black/30 on-scroll font-bold font-sans  bg-black mr-4 text-white text-center block w-full sm:w-auto rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Send Message</button>
									
								</div>
							</div>
						</form>
					</div>
					<div className="hidden lg:block bg-fixed rounded-xl bg-[url(https://res.cloudinary.com/meshed-nyc/h_1440,c_fill,q_auto/IMG_1616_2_acdcec483e.jpg)] bg-no-repeat lg:bg-[right_-20rem_top] xl:bg-[right_-20rem_top_-10rem] 2xl:bg-[right_-30rem_top_-15rem] bg-cover w-full border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					
				</div>
			</div>
			
		</section>
		{
			<div className={`${selectedTour!=null?'flex':'hidden'} fixed bg-white sm:bg-ricki/90 top-0 z-50 left-0 w-full h-screen items-center justify-center`}>
				<button onClick={() => setSelectedTour(null)} className="absolute top-0 right-0 w-10 h-10 sm:block sm:w-auto sm:h-auto sm:bg-transparent flex items-center justify-center bg-black text-white sm:top-5 sm:right-10 sm:text-white text-3xl"><FontAwesomeIcon icon={faTimes}/></button>
				<div className="bg-white px-4 sm:px-6 py-4 rounded-xl">
					<div className="max-w-[520px] w-full pt-4">
						<h3 className="font-bold text-lg sm:text-2xl mb-2 block">Book a private tour!</h3>
						<div className="border-b pb-2 mb-2 sm:mb-3 sm:border-0 sm:pb-0 text-lg text-sm xl:text-base mb-3 flex justify-start items-center sm:space-x-2"><span className="hidden sm:block">Complete this form, or contact me via</span><span className="block sm:hidden font-bold mr-2">You can also contact me on</span><a href="https://wa.link/w5o5ik" className="text-sm sm:text-sm px-3 sm:px-3 py-1 rounded-full font-bold bg-lime-400 text-lime-900 flex items-center hover:bg-lime-300" target="_blank"><WhatsApp className="w-4 h-4 mr-1"/> WhatsApp</a></div>
						<form name="tour-request" ref={formRef2} netlify="true" onSubmit={submitTourRequest}>
							<input type="hidden" name="form-name" value="tour-request"/>
							<input type="hidden" name="tour" value={selectedTour!=null?selectedTour.Title:''}/>
							<div className="sm:space-y-3">
								{selectedTour!=null&&<div className="flex items-center sm:space-x-3">
									<img src={selectedTour.Photo.formats.small.url} className="hidden sm:block w-20 h-20 rounded-full object-cover"/>
									<div className="">
										<h3 className="font-bold sm:text-lg">{selectedTour.Title}</h3>
										<div className="space-x-2">
											<span className="text-gray-900 text-xs sm:text-sm rounded-full font-bold">{numeral(selectedTour.Price).format('$0,0.00')} / person</span>
											<span className=" text-xs sm:text-sm">&middot;</span>
											<span className="text-gray-900 text-xs sm:text-sm">{selectedTour.Duration} {selectedTour.Duration==1?'hr':'hrs'}</span>
											
											{selectedTour.MinimumSize>1&&<><span className=" text-xs sm:text-sm">&middot;</span>
											<span className="text-gray-900 text-xs sm:text-sm">Min. {selectedTour.MinimumSize} ppl</span>
											</>}
										
										</div>
									</div>
								</div>}
								<div>
									<label className="hidden sm:block text-black text-sm font-bold">Name *</label>
									<input type="text" className="bg-white text-sm sm:text-base border-b sm:border-b-2 border-black px-1 sm:px-3 py-3 sm:py-2 w-full block" ref={nameRef2} name="name" placeholder="Your Name"/>
								</div>
								<div>
									<label className="hidden sm:block text-black text-sm font-bold">Email Address *</label>
									<input type="email" className="bg-white border-b sm:border-b-2 border-black text-sm sm:text-base px-1 sm:px-3 py-3 sm:py-2 w-full block" name="email" ref={emailRef2} placeholder="you@email.com"/>
								</div>

								<div className="md:grid grid-cols-2 gap-4 sm:space-y-3 md:space-y-0">
									<div>
										<label className="hidden sm:block text-black text-sm font-bold">Interested Tour Date(s)</label>
										<input name="interested_tour_dates" type="text" className="bg-white border-b sm:border-b-2 text-sm sm:text-base border-black px-1 sm:px-3 py-3 sm:py-2 w-full block" ref={tourDateRef2} placeholder="Interested Tour Date(s)"/>
									</div>
									<div>
										<label className="hidden sm:block text-black text-sm font-bold">Number of Guests</label>
										<input name="number_of_guests" type="number" className="bg-white border-b sm:border-b-2 text-sm sm:text-base border-black px-1 sm:px-3 py-3 sm:py-2 w-full block"ref={numGuestsRef2} placeholder="Number of Guests" />
									</div>
								</div>
								<div className="">
									<label className="hidden sm:block text-black text-sm font-bold">Message *</label>
									<textarea name="message" ref={messageRef2} rows={3} className="bg-white border-b sm:border-b-2 text-sm sm:text-base border-black px-1 sm:px-3 py-3 sm:py-2 w-full block" placeholder="Include any details. Do you have a special request?"></textarea>
								</div>
								<div className="mt-3 sm:mt-0">
									<ReCAPTCHA
							            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
							            onChange={setCaptcha2}
							          />
								</div>
								{
									error2!=false&&<div><span className="text-rose-500 motion-safe:animate-fadeIn font-bold">{error2}</span></div>
								}
								{
									showMessage2!=false&&<div><span className="text-lime-500 motion-safe:animate-fadeIn font-bold">Thank you for your message! I'll be in touch.</span></div>
								}
								<div className="mt-3 sm:mt-0 md:pb-4">
									<button type="submit" disabled={disabled2||captcha2==false} className="disabled:bg-black/30 block w-full on-scroll font-bold font-sans  bg-black  text-white text-center  rounded-full px-10 py-4 "><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Send Message</button>
									
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		}
	</Layout>
}

export const pageQuery = graphql`query MyQuery {
	strapiDestinationPhotography(locale: {eq: "en"}) {
		Title
		Description {
			data {
				Description
			}
		}
	}
  allStrapiTour(filter: {locale: {eq: "en"}}) {
    nodes {
      id
      Description
      Duration
      Private
      PriceUnder18
      MinimumSize
      Link
      locale
      Price
      Title
      Photo {
      	url
        formats {
          small {
            url
          }
          medium {
            url
          }
        }
      }
    }
  }
}`;

export const Head = ({location}) => (<Seo location={location}/>)

export default IndexPage;