import React, {useState, useRef} from "react"
import {Link, graphql} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {faArrowRight, faEnvelope, faArrowLeft, faX, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';
import ReCAPTCHA from "react-google-recaptcha";




const PhotographyPage = ({data}) => {

  const [photoIndex, setPhotoIndex] = useState(null);

  const [captcha, setCaptcha] = useState(false);

  const emailRef = useRef();

  const nameRef = useRef();

  const messageRef = useRef();

  const formRef = useRef();

  const [showMessage, setShowMessage] = useState(false);

  const [error, setError] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const changeImage = (index) => {
    if (index < 0) {
      setPhotoIndex(data.strapiGallery.Photos.length-1);

      return true;
    } else if (index >= data.strapiGallery.Photos.length) {
      setPhotoIndex(0);

      return true;
    }

    setPhotoIndex(index);
  }
	
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
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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

      return false;
  };
	
	return <Layout lang={'en'} className="bg-ricki" current="photography">
    <div className="h-[90vh] relative block md:bg-white md:h-[85vh] bg-top  bg-no-repeat bg-cover md:bg-none bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684327277/ricki-camera2_sjuyvb.jpg)]">
      <div className="w-full h-full  bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684490282/skyline-new_jxaw7j.png)]">
      <div className="flex md:container mx-auto  h-full items-end md:items-start md:pt-20 ">
        
        <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684327277/ricki-camera2_sjuyvb.jpg" className="rounded-2xl hidden md:block w-1/3 border-white border-8 shadow-xl -rotate-3" alt="Ricki with camera"/>
        
        <div className="py-10 bg-gradient-to-t md:bg-none w-full from-black to-transparent px-6">
            <h1 className="block mt-32 sm:mt-10 md:mt-0 font-epicursive text-white md:text-black font-bold text-6xl mb-8 mx-auto on-scroll">{data.strapiGallery.Title}</h1>
            <p className="text-lg text-white md:text-black md:font-medium on-scroll mb-8">{data.strapiGallery.Description}</p>
            <div className="space-y-2 md:space-y-0 md:space-x-2">
            <a href="#pricing" className=" bg-rose-400 px-6 py-3 border-2 border-rose-400 hover:border-rose-500 hover:bg-rose-500  text-white text-center font-bold block w-full md:w-auto md:inline-block rounded-full"><FontAwesomeIcon icon={faEnvelope}/> Contact me</a>
            <a href="#pricing" className="  bg-white hover:border-white border-2 border-white md:border-black px-6 py-3 text-black text-center font-bold block w-full md:w-auto md:inline-block rounded-full">View Pricing List</a>
            </div>
        </div>
        
      </div>
      </div>
    </div>
		<div className="pt-10  md:pt-0 md:-mt-16">
			<div className="container mx-auto px-6">
				
        

        <div className="sm:columns-2 md:columns-3 xl:columns-4 space-y-4 pb-20">
          {
            data.strapiGallery.Photos.map((photo, i) => <div className="on-scroll" key={`photo-${photo.id}`}>
                      <button className="px-0 py-0 my-0 block " onClick={() => setPhotoIndex(i)}><img src={photo.formats.medium.url} className=" h-auto max-w-full rounded-lg" alt="Photography by Ricki Sofer"/></button>

                    </div>)
          }
         

        </div>
        
          <div className="border-8 shadow-xl border-rose-300 bg-white px-6 py-8 rounded-2xl mb-20 md:max-w-4xl mx-auto">
          <h3 className="text-black text-3xl font-bold mb-4 font-goodlife text-center ">Price List</h3>
          <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684323019/squiggle-longer-different-pink_oajuo7.png" alt="" className="w-48 block mx-auto mt-2 mb-4"/>

          <ul className="  mb-8 rounded-xl space-y-3">
            {
              data.strapiDestinationPhotography.PriceList.map(price => <li className="block" key={`price-${price.id}`}>
                  <div className="md:flex md:space-x-4 items-start md:items-center justify-between text-lg"><strong className="block text-black text-base md:text-lg">{price.PackageName}</strong><span className="pt-2 border-b border-dashed border-gray-400 grow"></span><strong className="text-black text-xl">{numeral(price.Price).format('$0,0.00')}</strong></div>
                  <p className="text-gray-800 ">{price.Description}</p>
                </li>)
            }
          </ul>
          </div>
          </div>
          <div className="md:py-10 pb-20 md:pb-0">
            <div className="container px-6 mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:mt-8" id="contact">
          <div className="">
            <img className="sm:mt-12 xl:mt-0 hidden md:block rounded-2xl w-full border-8 border-white shadow-xl rotate-3" alt="" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684326461/340891683_2480864545405687_8894096958651822475_n_i2yocf.jpg"/>
          </div>
          <div className="md:col-span-2">

          <div className=" sm:px-6 py-4 rounded-xl">
            <h3 className="text-white text-3xl font-bold mb-4 font-goodlife text-center md:text-left">Contact Me</h3>
            
            <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-48 block mx-auto md:mx-0 mt-2 mb-3"/>
            <form ref={formRef}  action="/" name="photography" netlify="true" onSubmit={submitForm}>
            <input type="hidden" name="form-name" value="photography"/>
            <div className="space-y-3">
            <div>
                <label htmlFor="name" className="text-sm font-bold block text-white">Name *</label>
                <input id="name" type="text" ref={nameRef} name="name" className="text-sm border border-white bg-white rounded-md px-4 py-2 w-full block" />
              </div>
            <div className="md:grid md:grid-cols-2 space-y-2 md:space-y-0 md:gap-4">
            
            <div>
                <label htmlFor="email" className="text-sm font-bold block text-white">Email Address *</label>
                <input id="email" type="email" ref={emailRef} name="email" placeholder="you@email.com" className="text-sm border border-white bg-white rounded-md px-4 py-2 w-full block" />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-bold block text-white">Phone</label>
                <input id="phone" type="text" name="phone" className="text-sm border border-white bg-white rounded-md px-4 py-2 w-full block" />
              </div>
            </div>
            <div>
              <label htmlFor="package" className="text-sm font-bold block text-white">Which package are you interested in?</label>
              <select id="package" name="package" className="text-sm border px-3 py-2 rounded-md border-white w-full block">
                <option value="">-- Choose a package</option>
                {
                data.strapiDestinationPhotography.PriceList.map(price => <option key={`option-${price.id}`} value={price.PackageName}>
                    {price.PackageName}
                    </option>)
                }
              </select>
            </div>
            <div>
                <label htmlFor="message"  className="text-sm font-bold block text-white">Message *</label>
                <textarea id="message" disabled={disabled} ref={messageRef} name="message" rows={3} placeholder="Include details here..." className="disabled:text-gray-400 text-sm border border-white bg-white rounded-md px-4 py-2 w-full block"></textarea>
              </div>
              <div className="py-2">
                  <ReCAPTCHA
                          sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                          onChange={setCaptcha}
                        />
                </div>
              
              {
                  error!=false&&<div><span className="text-white font-bold  w-full"><span>{error}</span></span></div>
                }
                {
                  showMessage!=false&&<div><span className="text-white font-bold space-x-2 w-full"><FontAwesomeIcon icon={faCheck} className=""/><span>Thank you for your message! I'll be in touch.</span></span></div>
                }
                <div>
                <button disabled={captcha==''||disabled} className="disabled:opacity-50 bg-black px-8 py-3 text-white rounded-full font-bold space-x-2 w-full sm:w-auto block sm:inline-block"><FontAwesomeIcon icon={faArrowRight}/><span>Send Message</span></button>
              </div>
              </div>
            </form>
            </div>
          </div>
          
        </div>
        </div>
			</div>
		</div>
    {
      photoIndex!=null&&<div className="z-40 fixed backdrop-blur bg-black/80 top-0 left-0 w-screen h-screen items-center md:py-5 justify-between flex">
        <button onClick={() => setPhotoIndex(null)} className="z-50 absolute text-gray-200 top-5 right-5 text-3xl hover:text-teal-200"><FontAwesomeIcon icon={faX}/></button>
        <button onClick={() => changeImage(photoIndex-1)} className="z-50 absolute md:relative left-0 text-gray-200 text-3xl ml-5 hover:text-white"><FontAwesomeIcon icon={faArrowLeft}/></button>
        <img src={data.strapiGallery.Photos[photoIndex].url} className="rounded-xl max-h-full max-w-full motion-safe:animate-fadeIn"/>
        <button onClick={() => changeImage(photoIndex-1)} className="z-50 absolute md:relative right-0 text-gray-200 text-3xl mr-5 hover:text-white"><FontAwesomeIcon icon={faArrowRight}/></button>
      </div>
    }
	</Layout>
}

export const pageQuery = graphql`query MyQuery {
  strapiDestinationPhotography {
    PriceList {
      Description
      PackageName
      Price
      id
    }
  }
  strapiGallery {
    id
    Photos {
      formats {
        medium {
          url
        }
      }
      url
      id
    }
    Description
    Title
  }
}`;

export const Head = () => <Seo/>

export default PhotographyPage;