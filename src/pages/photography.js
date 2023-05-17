import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faEnvelope, faArrowLeft, faX} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';




const PhotographyPage = ({data}) => {

  const [photoIndex, setPhotoIndex] = useState(null);

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
	
  /*const chunks = [];

  const total = data.strapiGallery.Photos.length;

  const colSize = Math.floor(total/4);

  //alert(colSize);

  var count = 0;

  var chunk = [];

  data.strapiGallery.Photos.forEach(photo => {
    chunk.push(photo);
    if (chunk.length >= colSize) {
      chunks.push(chunk);
      chunk = [];
    }

  });

  for(var i = colSize*4; i < total; i++) {
    chunks[chunks.length-1].push(data.strapiGallery.Photos[i]);
  }*/
	
	return <Layout lang={'en'} className="bg-ricki">
    <div className="h-[90vh] relative block bg-white md:h-[60vh] bg-top md:bg-center bg-cover md:bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1684327277/ricki-camera2_sjuyvb.jpg)]">
      
      <div className="flex container mx-auto  h-full items-end md:items-center">
        <div className="py-10 bg-gradient-to-t md:bg-none w-full from-black to-transparent px-6">
            <h1 className="block mt-32 sm:mt-10 md:mt-0 font-epicursive text-white md:text-black font-bold text-6xl mb-6 mx-auto on-scroll">{data.strapiGallery.Title}</h1>
            <p className="text-lg text-white md:text-black on-scroll mb-4">{data.strapiGallery.Description}</p>

            <a href="#pricing" className=" bg-rose-400 px-6 py-3 text-white text-center font-bold block w-full md:w-auto md:inline-block rounded-full text-sm">View Photography Rates</a>
          </div>
      </div>
    </div>
		<div className="pt-10 md:pt-0 md:-mt-24 ">
			<div className="container mx-auto px-6">
				
        

        <div className="md:columns-2 lg:columns-3 xl:columns-4 space-y-4 pb-20">
          {
            data.strapiGallery.Photos.map((photo, i) => <div className="on-scroll" key={`photo-${photo.id}`}>
                      <button className="px-0 py-0 my-0 block " onClick={() => setPhotoIndex(i)}><img src={photo.formats.medium.url} className="h-auto max-w-full rounded-lg"/></button>

                    </div>)
          }
         

        </div>
        
          <div className="bg-white px-6 py-4 rounded-xl mb-20">
          <h3 className="text-black text-3xl font-bold mb-4 font-goodlife text-center md:text-left">Price List</h3>
          <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-48 block mx-auto md:mx-0 mt-2 mb-3"/>

          <ul className="  mb-8 rounded-xl space-y-3">
            {
              data.strapiDestinationPhotography.PriceList.map(price => <li className="block" key={`price-${price.id}`}>
                  <div className="md:flex md:space-x-4 items-start md:items-center justify-between text-lg"><strong className="block text-base md:text-lg">{price.PackageName}</strong><strong className="text-rose-400">{numeral(price.Price).format('$0,0.00')}</strong></div>
                  <p className="text-slate-600">{price.Description}</p>
                </li>)
            }
          </ul>
          </div>
          </div>
          <div className="bg-rose-400 py-10">
            <div className="container px-6 mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mt-8" id="contact">
          <div>
            <img className="rounded-xl w-full" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1684326461/340891683_2480864545405687_8894096958651822475_n_i2yocf.jpg"/>
          </div>
          <div className="md:col-span-2">

          <div className=" px-6 py-4 rounded-xl">
            <h3 className="text-white text-3xl font-bold mb-4 font-goodlife text-center md:text-left">Contact Me</h3>
            <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-48 block mx-auto md:mx-0 mt-2 mb-3"/>
            <div className="space-y-2">
            <div>
                <label className="text-sm font-bold block">Name</label>
                <input type="text" name="name" className="text-sm  border-gray-900 bg-white rounded-md px-4 py-2 w-full block" />
              </div>
            <div className="grid md:grid-cols-2 space-y-2 md:space-y-0">
            
            <div>
                <label className="text-sm font-bold block">Email Address</label>
                <input type="email" name="email" placeholder="you@email.com" className="text-sm border border-gray-900 bg-white rounded-md px-4 py-2 w-full block" />
              </div>
              <div>
                <label className="text-sm font-bold block">Phone</label>
                <input type="text" name="phone" className="text-sm border border-gray-900 bg-white rounded-md px-4 py-2 w-full block" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold block">Which package are you interested in?</label>
              <select className="text-sm border px-3 py-2 rounded-md border-gray-900 w-full block">
                {
                data.strapiDestinationPhotography.PriceList.map(price => <option key={`option-${price.id}`} value={price.PackageName}>
                    {price.PackageName}
                    </option>)
                }
              </select>
            </div>
            <div>
                <label className="text-sm font-bold block">Message</label>
                <textarea name="message" rows={3} placeholder="Include details here..." className="text-sm border border-gray-900 bg-white rounded-md px-4 py-2 w-full block"></textarea>
              </div>
            </div>
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