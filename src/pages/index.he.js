import React, {useState, useEffect, useRef} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faArrowLeft, faEnvelope, faStar, faStarEmpty, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
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

	const [showMessage, setShowMessage] = useState(false);

	const [error, setError] = useState(false);

	const [disabled, setDisabled] = useState(false);

	const nameRef = useRef();

	const emailRef = useRef();

	const messageRef = useRef();

	const mapRef = useRef();

	const formRef = useRef();

	useEffect(() => {
		const loader = new Loader({
		  apiKey: process.env.GATSBY_PLACES_API_KEY,
		  version: "weekly"
		});

		loader.load().then(async() => {
			const {PlacesService} = await window.google.maps.importLibrary("places");
			//console.log(PlacesService);

			var request = {
				language: 'iw',
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
          setError('אנא מלאו את השדות המסומנים');
          return false;
        }else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setError('האי מייל שכתבתם הוא לא תקין');
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
	
	
	return <Layout lang={'he'} footerClass="bg-rose-400">
		<section dir="rtl" className="bg-cover relative bg-center h-[90vh] md:hidden bg-[url(https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg)]">
			<div className="absolute w-full bottom-0  px-0">
				<h1 className="text-center font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll" >אני ריקי</h1>
				<h3 className=" font-goodlife text-white text-center font-bold text-2xl mb-3 uppercase font-bold on-scroll">המדריכה שלכם לניו יורק סיטי</h3>
				<div className="space-y-2 mb-8 px-6">
				<a href="https://fareharbor.com/embeds/book/guidedtoursnyc/?full-items=yes&language=en-us&u=f47e9dfd-04ed-4ca1-960c-04da78951fce&from-ssl=yes&ga4t=G-XDVQTYZ0FJ,974959174.1683229789__1684492288%3B&g4=yes&a=yes&back=https://rickiswalkingtours.com/" className="font-bold font-sans border border-rose-400 bg-rose-400 text-white text-center block w-full rounded-full px-10 py-3 inline-block"><FontAwesomeIcon icon={faArrowLeft} className="ml-4"/>לביצוע הזמנה</a>
				<a href="/#contact" className="font-bold font-sans border bg-white border-white bg-white text-black rounded-full px-10 py-3 text-center block w-full"><FontAwesomeIcon icon={faEnvelope} className="ml-4"/>צור קשר</a>
				</div>
			</div>
		</section>
		<section dir="rtl" className="bg-white hidden md:block">
		<div className=" bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684490282/skyline-new_jxaw7j.png)]">
		<div className="container mx-auto h-[90vh] lg:h-[80vh] px-4 md:px-0 lg:px-6 py-10 xl:py-6 flex items-center space-x-8 xl:space-x-10  ">

			<img alt="Ricki Sofer, Tour Guide" src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg" className="border-8 xl:ml-10 rounded-xl h-full shadow-xl border-white rotate-2 motion-safe:animate-fadeIn"/>
			<div className="">
				<h1 className="text-right font-epicursive text-black font-bold text-7xl mb-8 mx-auto on-scroll" >אני ריקי</h1>
				<h3 className="text-right  font-goodlife text-teal-900 font-bold text-3xl mb-4 uppercase font-bold ">המדריכה שלכם לניו יורק סיטי</h3>
				<h3 className="text-right  text-teal-900  text-lg font-sans mb-4 block xl:max-w-lg">הצטרפו אלי לסימטאות מלאות ההיסטוריה של ניו יורק, לטעום מהמאכלים הטובים ביותר וליהנות מהעיר ללא הפסקה.</h3>
				
				<div className="text-right">
				<a href="/#contact" className="font-bold font-sans border bg-white border-black text-black rounded-full px-10 py-4 block w-full text-center lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faEnvelope} className="ml-4"/>צור קשר</a>
				<a href="https://fareharbor.com/embeds/book/guidedtoursnyc/?full-items=yes&language=en-us&u=f47e9dfd-04ed-4ca1-960c-04da78951fce&from-ssl=yes&ga4t=G-XDVQTYZ0FJ,974959174.1683229789__1684492288%3B&g4=yes&a=yes&back=https://rickiswalkingtours.com/" className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 mb-2 lg:mb-0 text-white rounded-full px-10 py-4 block w-full lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faArrowLeft} className="ml-4"/>לביצוע הזמנה</a>
				</div>
			</div>
		</div>
		</div>
		</section>
		<section className="bg-ricki py-20" id="tours" dir="rtl">
			<div className="container mx-auto px-6 ">
			<h2 className="mb-20 text-5xl text-center md:text-right text-white font-bold font-goodlife">סיורים בעברית</h2>
			<div className="sm:grid xl:grid-cols-6 gap-8 xl:gap-10">
				{
					data.allStrapiTour.nodes.map(tour => {

						return <div key={`tour-${tour.id}`} className="md:flex on-scroll mb-6 sm:mb-0  xl:col-span-5">
							
							{tour.Photo.formats.medium!=null?<img alt={tour.Title} src={tour.Photo.formats.medium.url} className="md:ml-8 object-cover rounded-full mb-4 lg:mb-0 w-full md:w-64 md:h-64 aspect-square lg:w-72 lg:h-72 border-white border-8" />:<img alt={tour.Title} src={tour.Photo.url} className="md:ml-8 object-cover  md:w-64 md:h-64 rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-72 lg:h-72 border-white border-8" />}

							<div className="">
								<h3 className=" font-bold text-2xl xl:text-3xl font-goodlife text-white mb-1">{tour.Title}</h3>
								<div className="flex items-center text-teal-400 font-bold">
									
								<span className="text-white text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.Price).format('$0,0.00')} לאדם</span>
								{
									tour.PriceUnder18!=null&&tour.PriceUnder18!=''&&<>
										<span className="mx-2">&middot;</span>
										<span className="text-white text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.PriceUnder18).format('$0,0.00')} ילדים מתחת לגיל 18</span>
									</>
								}
									
									
								</div>
								<img alt="page divider squiggle" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-2 inline-block"/>
								<div className="">
								<p className="text-white/80 text-xl mb-4 xl:text-lg" dangerouslySetInnerHTML={{__html: tour.Description.replaceAll("\n", '<br/>')}}/>
								</div>
									<a href={tour.Link} className="w-full md:w-auto md:inline-block text-xl sm:text-base font-bold font-sans bg-rose-400 shadow-lg text-white rounded-full px-6 py-2 block text-center">אני רוצה להזמין<FontAwesomeIcon icon={faArrowLeft} className="mr-2"/> </a>

							</div>
							
						</div>})
				}
				</div>
			</div>
		</section>
		<section className="bg-ricki">
			<div className="rounded-lg px-6  container mx-auto py-8 md:py-20">
				<div className="md:grid grid-cols-2 gap-4 3xl:gap-12">
					<div className="flex lg:hidden on-scroll items-center 3xl:gap-12 2xl:flex">
					<img alt="Brooklyn Bridge in background, city street" src="https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg" className="w-full"/>
					</div>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg)] rounded-xl bg-no-repeat bg-top-left w-full md:min-h-[520px]  bg-white 2xl:hidden border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					<div className=" lg:px-8 py-6 on-scroll" dir="rtl">
						<h3 className="text-white text-4xl font-bold font-goodlife">{data.strapiDestinationPhotography.Title}</h3>
						<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer-different-pink_oajuo7.png" className="w-48 block my-3" alt="Pink squiggle page divider"/>
						<p className="text-white/80 xl:text-lg mb-4" dangerouslySetInnerHTML={{__html: data.strapiDestinationPhotography.Description.data.Description.replaceAll("\n", '<br/>')}}/>
						
						<div className="flex items-center space-x-4">
							<Link to="/he/photography"  className="px-6 py-2 bg-rose-400 shadow-lg text-white rounded-full font-bold inline-block">צילומים מקצועיים<FontAwesomeIcon icon={faArrowLeft} className="mr-2"/></Link>
							
						</div>
					</div>
				</div>
			</div>
		</section>

		{place!=null&&<section id="reviews" className="bg-rose-400 ">
			<div className="container mx-auto pt-20 xl:pt-32 px-6">

				<h3 className="text-white on-scroll text-center text-4xl sm:text-5xl font-bold font-goodlife mb-1">אז איך היה</h3>

				<div className="text-center on-scroll mb-8">
					<div className="text-2xl">
						{rating}
					</div>
					<a href={place.url} className="text-white hover:underline">{numeral(place.user_ratings_total).format('0,0')} total reviews</a>

				</div>


				<div dir="rtl" className="md:columns-2 lg:columns-2 pb-20">
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

							return <div className="on-scroll mb-4 w-full shadow-xl inline-block bg-white px-4 py-4 rounded-xl" key={`review-${review.author_name.replace(' ', '-')}`}>
								<div className="text-center mb-4">
									{stars}
									{emptyStars}

								</div>
								<p className="mb-3 text-sm" dangerouslySetInnerHTML={{__html: review.text.replaceAll("\n", '<br/>')}}></p>

								<div className="flex items-center space-x-3">
									<img alt={review.author_name} src={review.profile_photo_url} className="w-10 h-10 ml-3"/>
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
					<div className="on-scroll" dir="rtl">
						<h3 className="text-white text-4xl font-bold font-goodlife">שלחו הודעה ואחזור אליכם בהקדם</h3>
												<img alt="Page squiggle divider" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684323019/squiggle-black_desmmw.png" className="w-48 block my-3"/>

						<form name="contact" ref={formRef} netlify="true" onSubmit={submitForm}>
							<input type="hidden" name="form-name" value="contact"/>
							<div className="space-y-3">
								<div>
									<label className="block text-white text-sm font-bold">* שם</label>
									<input type="text" className="bg-white rounded-md px-4 py-2 w-full block" ref={nameRef} name="name" />
								</div>
								<div>
									<label className="block text-white text-sm font-bold">* דוא"ל</label>
									<input type="email" className="bg-white rounded-md px-4 py-2 w-full block" name="email" ref={emailRef}/>
								</div>
								<div className="sm:grid grid-cols-2 gap-4 space-y-3 sm:space-y-0">
									<div>
										<label className="block text-white text-sm font-bold">תאריכים מבוקשים</label>
										<input name="requested_tour_dates" type="text" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
									<div>
										<label className="block text-white text-sm font-bold">מספר אנשים</label>
										<input name="number_of_guests" type="number" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
								</div>
								<div className="">
									<label className="block text-white text-sm font-bold">* ההודעה שלך</label>
									<textarea name="message" ref={messageRef} rows={4} className="bg-white rounded-md px-4 py-2 w-full block" placeholder="איזה טיול מעניין אותך? יש בקשה מיוחדת ?"></textarea>
								</div>
								<div>
									<ReCAPTCHA
							            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
							            onChange={setCaptcha}
							            hl="iw"
							          />
								</div>
								{
									error!=false&&<div><span className="text-white motion-safe:animate-fadeIn font-bold">{error}</span></div>
								}
								{
									showMessage!=false&&<div><span className="text-white motion-safe:animate-fadeIn font-bold">‏תודה שיצרתם קשר עם ריקי סיורים בניו-יורק אחזור אליכם ‎-תוך 24 שעות אם זה דחוף יש בתחתית העמוד קישור לוואטס אפ מוזמנים ליצור קשר .</span></div>
								}
								<div className="">
									<button type="submit" disabled={disabled||captcha==false} className="disabled:bg-black/30 on-scroll font-bold font-sans  bg-black ml-4 text-white text-center block w-full sm:w-auto rounded-full px-10 py-4 inline-block">שליחה<FontAwesomeIcon icon={faArrowLeft} className="mr-4"/></button>
									
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
	</Layout>
}

export const pageQuery = graphql`query MyQuery {
	strapiDestinationPhotography(locale: {eq: "he-IL"}) {
		Title
		Description {
			data {
				Description
			}
		}
	}
  allStrapiTour(filter: {locale: {eq: "he-IL"}}) {
    nodes {
      id
      Description
      Duration
      Private
      MinimumSize
      Link
      locale
      Price
      PriceUnder18
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

export const Head = ({location}) => <Seo location={location} lang="he-IL"/>

export default IndexPage;