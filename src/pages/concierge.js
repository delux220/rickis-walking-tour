import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {WhatsApp} from '../components/index';
import {faArrowRight, faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';



const ConciergePage = ({data}) => {
  
  return <Layout lang={'en'} className="bg-ricki" current="about">
      <div className="bg-white pb-10">
        <div className="md:container mx-auto xl:px-0">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 xl:gap-8">
            <div className="bg-cover bg-center h-[80vh] md:hidden px-3 py-10 flex items-end justify-center" style={{backgroundImage: "url('"+data.strapiConcierge.Image.formats.large.url+"')"}}>
              <div>
                <h1 className=" block w-full text-center text-white font-bold text-5xl font-epicursive mb-4">{data.strapiConcierge.Title}</h1>
                <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="mx-auto block w-48 my-6"/>

              </div>
            </div>
            <div className="hidden md:block">
              {
                data.strapiConcierge.Image.formats.large!=null?<img src={data.strapiConcierge.Image.formats.large.url} className="w-full hidden md:block"/>:<img src={data.Image.url} className="w-full hidden md:block"/>
              }

            </div>
            <div className="lg:col-span-2 py-5 px-4 md:px-0">
              <h1 className="hidden md:block font-bold text-5xl font-epicursive mb-4">{data.strapiConcierge.Title}</h1>
              <div className="pl-1 mb-4">
              <img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="hidden md:block w-48 my-6"/>
              <div id="post" dangerouslySetInnerHTML={{__html: data.strapiConcierge.Content.data.Content}}/>
              </div>
              <div>
                <a href="https://wa.link/w5o5ik" target="_blank" class="shadow-lg bg-lime-500 sm:w-72 space-x-2 w-full text-center px-8 py-3 rounded-full justify-center text-white font-bold hover:bg-lime-400 flex items-center"><WhatsApp className="hover:fill-white fill-white w-5 h-5"/><span>Contact me on WhatsApp</span></a>
              </div>
            </div>


          </div>
        </div>
      </div>
  </Layout>
}

export const pageQuery = graphql`query MyQuery {
  strapiConcierge(locale: {eq: "en"}) {
    Description
    Image {
      url
      formats {
        large {
          url
        }
      }
    }
    Title
    locale
    Content {
      data {
        Content
      }
    }
  }
}`;

export const Head = ({location, data}) => <Seo location={location} lang="en" title={data.strapiConcierge.Title} description={data.strapiConcierge.Description}/>

export default ConciergePage;