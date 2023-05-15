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
	
	return <Layout lang={'en'} className="bg-teal-300">
    <div className="hidden md:block bg-white h-96">

    </div>
		<div className=" md:-mt-96 ">
			<div className="container mx-auto px-6">
				<div className="pt-20">
					
					<div className="">
						<h1 className="mt-32 sm:mt-10 md:mt-0 font-epicursive text-black font-bold text-6xl mb-6 mx-auto on-scroll">{data.strapiGallery.Title}</h1>
						<p className="text-lg on-scroll mb-10">{data.strapiGallery.Description}</p>
						
					</div>
				</div>
        <div className="md:columns-2 lg:columns-3 xl:columns-4 space-y-4 pb-20">
          {
            data.strapiGallery.Photos.map((photo, i) => <div className="on-scroll" key={`photo-${photo.id}`}>
                      <button className="px-0 py-0 my-0 block " onClick={() => setPhotoIndex(i)}><img src={photo.formats.medium.url} className="h-auto max-w-full rounded-lg"/></button>

                    </div>)
          }
         

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