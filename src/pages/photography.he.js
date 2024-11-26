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
  
  return <Layout lang={'he'} className="bg-white" footerClass="bg-light" current="photography">
    <div className="h-[90vh] md:h-auto relative block md:bg-none bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684327277/ricki-camera2_sjuyvb.jpg)] lg:min-h-[640px] md:h-[85vh] bg-top  bg-no-repeat bg-cover ">
      <div className="w-full h-full  bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain ">
      <div dir="rtl" className="flex md:container mx-auto  h-full items-end md:items-start md:pt-20 ">
        
        <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684327277/ricki-camera2_sjuyvb.jpg" className=" max-h-[60vh] hidden md:block w-1/3" alt="Photographer Ricki with camera"/>
        
        <div className="py-10 bg-gradient-to-t md:bg-none w-full from-white via-transparent to-transparent px-6">
            <h1 className="block text-right mt-32 sm:mt-10 md:mt-0 font-epicursive text-[#000000] md:text-black font-bold text-6xl mb-4 mx-auto on-scroll">{data.strapiGallery.Title}</h1>
            <p className="text-lg text-right text-black md:font-medium on-scroll mb-8">{data.strapiGallery.Description}</p>
            <div className="space-y-2 md:space-y-0 md:space-x-2 text-right">
            <a href="#contact" className=" block md:inline-block button bg-black text-white"><FontAwesomeIcon icon={faEnvelope}/> צור קשר</a>
            <a href="#pricing" className="block md:inline-block  button secondary">מחירים לסשן צילומים</a>
            </div>
        </div>
        
      </div>
      </div>
    </div>
    <div id="pricing" dir="rtl" className=" mb-20 hadow-xl border-rose-300 bg-white px-6 py-8 rounded-2xl mb-20 md:max-w-4xl mx-auto">
          <h3 className="text-black text-3xl font-bold mb-4 font-goodlife text-center ">מחירון טיולים+צילומים</h3>
          <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1732583816/Vector_snp5wb.png" alt="Floral Branch" className="w-20 block mx-auto mt-2 mb-4"/>

          <ul className="  mb-8 rounded-xl space-y-3">
            {
              data.strapiDestinationPhotography.PriceList.map(price => <li className="block" key={`price-${price.id}`}>
                  <div className="md:flex md:space-x-4 items-start md:items-center justify-between text-lg"><strong className="block text-black text-base md:text-lg">{price.PackageName}</strong><span className="pt-2 border-b border-dashed border-gray-400 grow"></span><strong className="text-black text-xl">{numeral(price.Price).format('$0,0.00')}</strong></div>
                  <p className="text-gray-800 ">{price.Description}</p>
                </li>)
            }
          </ul>
          </div>
    <div className="pt-10  md:pt-0 md:-mt-16">
      <div className="container mx-auto px-4 md:px-20">
        
        

        <div className="md:columns-2 space-y-4 pb-20">
          {
            data.strapiGallery.Photos.map((photo, i) => <div className="on-scroll" key={`photo-${photo.id}`}>
                      <button className="px-0 py-0 my-0 block w-full" onClick={() => setPhotoIndex(i)}><img src={photo.formats.large.url} className="w-full h-auto max-w-full block" alt="Photography by Ricki Sofer"/></button>

                    </div>)
          }
         

        </div>
        
          
          </div>
          <div className="md:py-10 pb-20 md:pb-0" dir="rtl">
            <div className="container px-6 mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:mt-8" id="contact">
          <div className="">
            <img className="sm:mt-12 xl:mt-0 hidden md:block rounded-2xl w-full border-8 border-white shadow-xl rotate-3" alt="Photographer Ricki Sofer with camera" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684326461/340891683_2480864545405687_8894096958651822475_n_i2yocf.jpg"/>
          </div>
          <div className="md:col-span-2">

          <div className=" sm:px-6 py-4 rounded-xl">
            <h3 className="text-gold text-3xl font-bold mb-4 text-center md:text-right">צור קשר</h3>
            
            <form ref={formRef}  action="/" name="photography" netlify="true" onSubmit={submitForm}>
            <input type="hidden" name="form-name" value="photography"/>
            <div className="space-y-3">
            <div>
                <label htmlFor="name" className="text-sm font-bold block text-gold">*</label>
                <input id="name" type="text" ref={nameRef} name="name" className="input w-full block" placeholder="שם"/>
              </div>
            <div className="md:grid md:grid-cols-2 space-y-2 md:space-y-0 md:gap-4">
            
            <div>
                <label htmlFor="email" className="text-sm font-bold block text-gold">*</label>
                <input id="email" type="email" ref={emailRef} name="email" placeholder={'דוא"ל'} className="input w-full block" />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-bold block text-gold">&nbsp;</label>
                <input id="phone" type="text" name="phone" className="input w-full block" placeholder="מספר טלפון"/>
              </div>
            </div>
            <div>
              <label htmlFor="package" className="text-sm font-bold block text-white">&nbsp;</label>
              <select id="package" name="package" className="input w-full block">
                <option value="">-- באיזה חבילה אתה מעוניין?</option>
                {
                data.strapiDestinationPhotography.PriceList.map(price => <option key={`option-${price.id}`} value={price.PackageName}>
                    {price.PackageName}
                    </option>)
                }
              </select>
            </div>
            <div>
                <label htmlFor="message"  className="text-sm font-bold block text-gold">*</label>
                <textarea id="message" disabled={disabled} ref={messageRef} name="message" rows={3} placeholder="ההודעה שלך" className="disabled:text-gray-400 input w-full block"></textarea>
              </div>
              <div className="py-2">
                  <ReCAPTCHA
                          sitekey={process.env.GATSBY_RECAPTCHA_KEY}
                          onChange={setCaptcha}
                          hl="iw"
                        />
                </div>
              
              {
                  error!=false&&<div><span className="text-white font-bold  w-full"><span>{error}</span></span></div>
                }
                {
                  showMessage!=false&&<div><span className="text-white font-bold space-x-2 w-full"><FontAwesomeIcon icon={faCheck} className=""/><span>Thank you for your message! I'll be in touch.</span></span></div>
                }
                <div>
                <button disabled={captcha==''||disabled} className="disabled:opacity-50 button hover:bg-gold bg-black text-white  w-full sm:w-auto block sm:inline-block"><FontAwesomeIcon icon={faArrowLeft} className="ml-2"/><span>שליחה</span></button>
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
        <img alt={`Photography by Ricki Sofer`} src={data.strapiGallery.Photos[photoIndex].url} className="rounded-xl max-h-full max-w-full motion-safe:animate-fadeIn"/>
        <button onClick={() => changeImage(photoIndex-1)} className="z-50 absolute md:relative right-0 text-gray-200 text-3xl mr-5 hover:text-white"><FontAwesomeIcon icon={faArrowRight}/></button>
      </div>
    }
  </Layout>
}

export const pageQuery = graphql`query MyQuery {
  strapiDestinationPhotography(locale: {eq: "he-IL"}) {
    id
    PriceList {
      Description
      PackageName
      Price
      id
    }
    Description {
      data {
        Description
      }
    }
    Title
    locale
  }
  strapiGallery(locale: {eq: "he-IL"}) {
    Photos {
      url
      formats {
        medium {
          url
        }
        large {
          url
        }
      }
      id
    }
    Title
    Description
    localizations {
      data {
        attributes {
          Description
          Title
          locale
        }
      }
    }
  }
}`;

export const Head = ({location}) => <Seo location={location} lang="he-IL" page="photography"/>

export default PhotographyPage;