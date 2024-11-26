import React, {useState, useEffect, useRef} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faChevronLeft, faChevronRight, faArrowLeft, faEnvelope, faStar, faStarEmpty, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { Loader } from "@googlemaps/js-api-loader"
import ReCAPTCHA from "react-google-recaptcha";
import Slider from "react-slick";
   import "slick-carousel/slick/slick.css"; 
   import "slick-carousel/slick/slick-theme.css";


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

const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoPlay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true
  };

const IndexPage = ({data}) => {

	const sliderRef = useRef();

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
	
	
	return <Layout lang={'he'} footerClass="bg-light">
		
		<section dir="rtl" className="bg-white bg-contain block bg-[url(https://rickiswalkingtours.com/wp-content/uploads/2024/11/5fdaccbc-0f65-4d3c-b35b-d53cd8ac5f0d.jpg)] md:bg-cover bg-top md:bg-center bg-no-repeat">
		<img src="https://rickiswalkingtours.com/wp-content/uploads/2024/11/5fdaccbc-0f65-4d3c-b35b-d53cd8ac5f0d.jpg" className="md:hidden block w-full"/>
		<div className="container mx-auto h-[0] md:h-[80vh] px-4 md:px-0 lg:px-6 py-10 xl:py-6 flex items-center space-x-8 xl:space-x-10  ">

			<img alt="Ricki Sofer, Tour Guide" src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg" className="hidden border-8 xl:ml-10 rounded-xl h-full shadow-xl border-white motion-safe:animate-fadeIn"/>
			
		</div>
		</section>
		<section>
			<div className="container mx-auto  flex items-center justify-center sm:px-6">
				<div className="bg-white px-4 sm:px-8 py-8">
					<h2 className=" text-center font-epicursive text-gold font-bold text-7xl mb-8 mx-auto on-scroll" >אני ריקי</h2>
					<h3 className="text-center text-gold font-goodlife font-bold text-3xl mb-4 uppercase font-bold ">המדריכה שלכם לניו יורק סיטי</h3>
					<h3 className="text-center text-black  text-lg font-sans mb-8 block xl:max-w-lg">הצטרפו אלי לסימטאות מלאות ההיסטוריה של ניו יורק, לטעום מהמאכלים הטובים ביותר וליהנות מהעיר ללא הפסקה.</h3>
					
					<div className="text-center sm:flex items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
					<a href="/#contact" className="button secondary block w-full lg:w-auto lg:inline-block"><FontAwesomeIcon icon={faEnvelope} className="ml-4"/><span>צור קשר</span></a>
					<a href="https://fareharbor.com/embeds/book/guidedtoursnyc/?full-items=yes&language=en-us&u=f47e9dfd-04ed-4ca1-960c-04da78951fce&from-ssl=yes&ga4t=G-XDVQTYZ0FJ,974959174.1683229789__1684492288%3B&g4=yes&a=yes&back=https://rickiswalkingtours.com/" className="button primary mr-4 lg:mb-0 block w-full lg:w-auto lg:inline-block "><FontAwesomeIcon icon={faArrowLeft} className="ml-4"/><span>לביצוע הזמנה</span></a>
					</div>
				</div>
			</div>
		</section>
		<section >
			<div className="container max-w-7xl mx-auto px-6 py-20">
				<div className="sm:grid sm:grid-cols-2 sm:gap-8 space-y-4 sm:space-y-0">
					<div>
						<img src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg"/>
					</div>
					<div dir="rtl" className="flex justify-center items-center">
						<div>
						<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1732566404/unnamed-file_mikhzk.png" className="mx-auto block mb-8" alt="Quote"/>
						<h3 className="text-6xl text-center text-gold font-bold font-goodlife">היי, אני ריקי!</h3>
						<p className="text-2xl font-sans text-center block my-8">אני גר בניו יורק כבר 15 שנים, ועבדתי כקומיקאי סטנדאפ וכצלם. אחרי מגפת הקורונה, החלטתי לשנות קריירה ולהפוך למדריך טיולים בניו יורק. כך הצלחתי לשלב את האהבה שלי לעיר עם כמה בדיחות פה ושם, תוך כדי שאני מצלם כמה תמונות בדרך. אני נהנה להכיר חברים חדשים ולהתחבר לאנשים. מעל לעשור שבו עשיתי סטנדאפ לימדו אותי איך לשבור את הקרח בשתי שניות, כך שכל סיור וצילומים ירגישו כמו בילוי עם חברים ולא כמו משימה מלחיצה.</p>
						<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1732566404/Asset-1Flowerz-Underline-1_ysk5ve.png" className="block mx-auto" alt="floral seperator"/>
					</div>
					</div>
				</div>
			</div>
		</section>
		
		<section className="relative">
			<div className="">
				<Slider {...settings} ref={sliderRef}>
					<div>
			      <div className="md:grid md:grid-cols-2 overflow-visible pb-10 md:pb-0 px-8 md:px-0"  dir="rtl">
			        <div className="flex justify-end  h-full overflow-visible">
			        	<div className="md:aspect-square relative block h-[100%]  sm:max-w-xl">
			        		<div className="sm:absolute bg-light px-4 py-4 top-10 sm:w-[50vw] right-0" >
			        			<h3 className="text-3xl md:text-5xl">צילום הצעות נישואין</h3>

			        		</div>
			        		<div className="mt-10 md:mt-40">
				        		<p className="text-2xl">זה מתעד אחד הרגעים האינטימיים והשמחים ביותר בחיים—הרגע שבו שני לבבות מחליטים על לנצח. מההמתנה הנרגשת ועד החיוכים הזוהרים וה"כן" מלב, כל פרט נשמר בצורה יפה. בין אם זו הפתעה גדולה ומתוכננת או מחווה אינטימית ושקטה, אנו דואגים שהרגשות, ההקשר והסיפור של ההצעה שלכם יתועדו בצורה אותנטית. התמונות הנצחיות הללו הופכות למזכרת יקרה, חגיגה של אהבה שמסמלת את תחילת הפרק הבא שלכם יחד.</p>
				        		<Link to='/photography' className="z-50 bg-black text-white block text-center sm:inline-block mt-10 button">פרטים</Link>
				        	</div>
			        	</div>
			        </div>
			        <div className="hidden sm:block aspect-square bg-[url(https://rickiswalkingtours.com/wp-content/uploads/2024/11/0Y4A8118-1739x2048.jpg)] bg-cover">
			        	&nbsp;
			        </div>
			      </div>
			      </div>

			      <div>
			      <div className="md:grid md:grid-cols-2 overflow-visible pb-10 md:pb-0 px-8 md:px-0"  dir="rtl">
			        <div className="flex justify-end  h-full overflow-visible">
			        	<div className="md:aspect-square relative block h-[100%]  sm:max-w-xl">
			        		<div className="sm:absolute bg-light px-4 py-4 top-10 sm:w-[50vw] right-0" >
			        			<h3 className="text-3xl md:text-5xl">צילום הצעות נישואין</h3>

			        		</div>
			        		<div className="mt-10 md:mt-40">
				        		<p className="text-2xl">זה מתעד אחד הרגעים האינטימיים והשמחים ביותר בחיים—הרגע שבו שני לבבות מחליטים על לנצח. מההמתנה הנרגשת ועד החיוכים הזוהרים וה"כן" מלב, כל פרט נשמר בצורה יפה. בין אם זו הפתעה גדולה ומתוכננת או מחווה אינטימית ושקטה, אנו דואגים שהרגשות, ההקשר והסיפור של ההצעה שלכם יתועדו בצורה אותנטית. התמונות הנצחיות הללו הופכות למזכרת יקרה, חגיגה של אהבה שמסמלת את תחילת הפרק הבא שלכם יחד.</p>
				        		<Link to='/photography' className="z-50 bg-black text-white block text-center sm:inline-block mt-10 button">פרטים</Link>
				        	</div>
			        	</div>
			        </div>
			        <div className="hidden sm:block aspect-square bg-[url(https://rickiswalkingtours.com/wp-content/uploads/2024/11/0Y4A8118-1739x2048.jpg)] bg-cover">
			        	&nbsp;
			        </div>
			      </div>
			      </div>

			      <div>
			      <div className="md:grid md:grid-cols-2 overflow-visible pb-10 md:pb-0 px-8 md:px-0"  dir="rtl">
			        <div className="flex justify-end  h-full overflow-visible">
			        	<div className="md:aspect-square relative block h-[100%]  sm:max-w-xl">
			        		<div className="sm:absolute bg-light px-4 py-4 top-10 sm:w-[50vw] right-0" >
			        			<h3 className="text-3xl md:text-5xl">צילום הצעות נישואין</h3>

			        		</div>
			        		<div className="mt-10 md:mt-40">
				        		<p className="text-2xl">זה מתעד אחד הרגעים האינטימיים והשמחים ביותר בחיים—הרגע שבו שני לבבות מחליטים על לנצח. מההמתנה הנרגשת ועד החיוכים הזוהרים וה"כן" מלב, כל פרט נשמר בצורה יפה. בין אם זו הפתעה גדולה ומתוכננת או מחווה אינטימית ושקטה, אנו דואגים שהרגשות, ההקשר והסיפור של ההצעה שלכם יתועדו בצורה אותנטית. התמונות הנצחיות הללו הופכות למזכרת יקרה, חגיגה של אהבה שמסמלת את תחילת הפרק הבא שלכם יחד.</p>
				        		<Link to='/photography' className="z-50 bg-black text-white block text-center sm:inline-block mt-10 button">פרטים</Link>
				        	</div>
			        	</div>
			        </div>
			        <div className="hidden sm:block aspect-square bg-[url(https://rickiswalkingtours.com/wp-content/uploads/2024/11/0Y4A8118-1739x2048.jpg)] bg-cover">
			        	&nbsp;
			        </div>
			      </div>
			      </div>
			      
			    </Slider>
			</div>
			<div className="absolute left-0 top-0 h-full flex items-center justify-center">
				<button onClick={() => { sliderRef.current.slickPrev(); }} className="w-10 h-10 z-50"><FontAwesomeIcon icon={faChevronLeft} className="text-right md:w-20 md:h-20"/></button>
			</div>
			<div className="absolute right-0 top-0 h-full flex items-center justify-center">
				<button onClick={() => { sliderRef.current.slickNext(); }} className="w-10 h-10 z-50"><FontAwesomeIcon icon={faChevronRight} className="text-right"/></button>
			</div>
		</section>
		<section  className="bg-cover my-20 bg-center lg:bg-center xl:bg-top-center bg-[url(https://res.cloudinary.com/meshed-nyc/q_auto/v1732584399/nyc2_ms6vcc.jpg)]">

			<div className="lg:container mx-auto">
				<div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid mx-auto">
					<div className="lg:col-span-2 xl:col-span-3">

					</div>
					<div className="bg-white px-8 py-20 xl:col-span-2" dir="rtl">
						<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1732583816/Vector_snp5wb.png" className="mx-auto block"/>
						<h3 className="text-black text-center text-4xl my-8">תהנו מאוד בניו יורק!</h3>
						<p className="text-black text-center text-2xl mb-20">אני אשמח לראות אתכם בסיורים שלי, לצלם את החתונה שלכם, או לעזור לכם להפתיע את בן/בת הזוג שלכם עם הצעת נישואין. אני עונה לכל המיילים שלי תוך פחות מ-24 שעות.</p>
					</div>
				</div>
			</div>
		</section>
		<section className="bg-subdued py-20" id="tours" dir="rtl">
			<div className="container mx-auto px-6 ">
			<h2 className="mb-20 text-5xl text-gold font-bold text-center">סיורים בעברית</h2>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 space-y-8 sm:space-y-0">
				{
					data.allStrapiTour.nodes.map(tour => {

						return <div key={`tour-${tour.id}`} className="">
							
							{tour.Photo!=null?(tour.Photo.formats!=null&&tour.Photo.formats.medium!=null?<img alt={tour.Title} src={tour.Photo.formats.medium.url.replace('.heic', '.jpg')} className="object-cover rounded-lg mb-4 block w-full  aspect-square " />:<img alt={tour.Title} src={tour.Photo.url.replace('.heic', '.jpg')} className="object-cover  rounded-lg mb-4 block w-full aspect-square  " />):<div className="object-cover   rounded-lg mb-4 block w-full aspect-square ">&nbsp;</div>}
							
							<div className="">
								<h3 className=" text-2xl xl:text-3xl text-black mb-1">{tour.Title}</h3>
								<div className="font-bold">
									
								<span className="text-black text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.Price).format('$0,0.00')} לאדם</span>
								{
									tour.PriceUnder18!=null&&tour.PriceUnder18!=''&&<>
										<span className="mx-2">&middot;</span>
										<span className="text-black text-sm sm:text-base md:text-lg rounded-full font-bold">{numeral(tour.PriceUnder18).format('$0,0.00')} ילדים מתחת לגיל 18</span>
									</>
								}
									
									
								</div>
								<div className="">
								<p className="hidden text-black/80 text-xl mb-4 xl:text-lg" dangerouslySetInnerHTML={{__html: tour.Description.replaceAll("\n", '<br/>')}}/>
								</div>
									<a href={tour.Link} className="mt-4 w-full text-center button primary block">אני רוצה להזמין<FontAwesomeIcon icon={faArrowLeft} className="mr-2"/> </a>

							</div>
							
						</div>})
				}
				</div>
			</div>
		</section>
		<section className="bg-white hidden">
			<div className="rounded-lg px-6  container mx-auto py-8 md:py-20">
				<div className="md:grid grid-cols-2 gap-4 3xl:gap-12">
					<div className="flex lg:hidden on-scroll items-center 3xl:gap-12 2xl:flex">
					<img alt="Brooklyn Bridge in background, city street" src="https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg" className="w-full"/>
					</div>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg)] rounded-xl bg-no-repeat bg-top-left w-full md:min-h-[520px]  bg-white 2xl:hidden border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					<div className=" lg:px-8 py-6 on-scroll" dir="rtl">
						<h3 className="text-gold mb-4 text-4xl font-bold font-goodlife">{data.strapiDestinationPhotography.Title}</h3>
						
						<p className="text-black xl:text-lg mb-4" dangerouslySetInnerHTML={{__html: data.strapiDestinationPhotography.Description.data.Description.replaceAll("\n", '<br/>')}}/>
						
						<div className="flex items-center space-x-4">
							<Link to="/he/photography"  className="button primary">צילומים מקצועיים<FontAwesomeIcon icon={faArrowLeft} className="mr-2"/></Link>
							
						</div>
					</div>
				</div>
			</div>
		</section>

		{place!=null&&<section id="reviews" className="bg-subdued">
			<div className="container mx-auto pt-20 xl:pt-32 px-6">

				<h3 className="text-gold on-scroll text-center text-4xl sm:text-5xl  mb-1">אז איך היה</h3>

				<div className="text-center on-scroll mb-8">
					<div className="text-2xl">
						{rating}
					</div>
					<a href={place.url} className="text-white hover:underline">{numeral(place.user_ratings_total).format('0,0')} total reviews</a>

				</div>


				<div dir="rtl" className="md:columns-2 lg:columns-3 pb-20">
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

							return <div className="on-scroll bg-light mb-4 w-full inline-block px-4 py-4 rounded-xl" key={`review-${review.author_name.replace(' ', '-')}`}>
								<div className="text-center mb-4">
									{stars}
									{emptyStars}

								</div>
								<p className="mb-3 text-lg" dangerouslySetInnerHTML={{__html: review.text.replaceAll("\n", '<br/>')}}></p>

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
		<section className="bg-subdued pt-8 pb-12 md:py-20"  id="contact">
			<div className="container mx-auto px-6">
				<div className="lg:grid grid-cols-2 gap-10 xl:gap-12 space-y-20 lg:space-y-0">
					<div className="on-scroll" dir="rtl">
						<h3 className="text-gold text-4xl font-bold font-goodlife">שלחו הודעה ואחזור אליכם בהקדם</h3>
						
						<form name="contact" ref={formRef} netlify="true" onSubmit={submitForm}>
							<input type="hidden" name="form-name" value="contact"/>
							<div className="space-y-3">
								<div>
									<label className="block text-black text-sm font-bold hidden"></label>
									<input type="text" className="input w-full block" ref={nameRef} name="name" placeholder="* שם"/>
								</div>
								<div>
									<label className="block text-black text-sm font-bold hidden"></label>
									<input type="email" className="input  w-full block" name="email" ref={emailRef} placeholder="* דוא"/>
								</div>
								<div className="sm:grid grid-cols-2 gap-4 space-y-3 sm:space-y-0">
									<div>
										<label className="block text-black text-sm font-bold hidden"></label>
										<input name="requested_tour_dates" type="text" className="input w-full block" placeholder="תאריכים מבוקשים"/>
									</div>
									<div>
										<label className="block text- black text-sm font-bold hidden"></label>
										<input name="number_of_guests" type="number" className="input w-full block" placeholder="מספר אנשים" />
									</div>
								</div>
								<div className="">
									<label className="block text-black text-lg">ההודעה שלך</label>
									<textarea name="message" ref={messageRef} rows={4} className="input w-full block" placeholder="איזה טיול מעניין אותך? יש בקשה מיוחדת ?"></textarea>
								</div>
								<div>
									<ReCAPTCHA
							            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
							            onChange={setCaptcha}
							            hl="iw"
							          />
								</div>
								{
									error!=false&&<div><span className="text-black motion-safe:animate-fadeIn font-bold">{error}</span></div>
								}
								{
									showMessage!=false&&<div><span className="text-black motion-safe:animate-fadeIn font-bold">‏תודה שיצרתם קשר עם ריקי סיורים בניו-יורק אחזור אליכם ‎-תוך 24 שעות אם זה דחוף יש בתחתית העמוד קישור לוואטס אפ מוזמנים ליצור קשר .</span></div>
								}
								<div className="">
									<button type="submit" disabled={disabled||captcha==false} className="disabled:bg-light/50 on-scroll w-full sm:w-auto button primary inline-block">שליחה<FontAwesomeIcon icon={faArrowLeft} className="mr-4"/></button>
									
								</div>
							</div>
						</form>
					</div>
					<div>
					<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1732629750/8X9A5730-1365x2048_yvkzkw.jpg"/>
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