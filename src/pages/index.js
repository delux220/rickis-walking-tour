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
		window.location.replace('/he');
	}, []);

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
	
	
	return <div>
	</div>
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