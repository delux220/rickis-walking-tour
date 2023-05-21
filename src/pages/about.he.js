import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';



const AboutPage = ({data}) => {
  
  return <Layout lang={'he'} className="bg-ricki" current="about">
    <div className="hidden md:block bg-white h-96">
      &nbsp;
      </div>
    <div className=" md:-mt-96">
      <div className=" border-white md:hidden relative h-[90vh] bg-cover bg-center" style={{backgroundImage: `url('${data.strapiAboutPage.Photo.formats.large.url}')`}}>
        <div className="absolute bottom-0 left-0 w-full px-6">
            <h1 className=" font-epicursive text-white text-center font-bold text-6xl mb-3 mx-auto on-scroll">{data.strapiAboutPage.Title}</h1>
        </div>
      </div>

      <div dir="rtl" className="container mx-auto px-6 xl:px-0 md:h-[90vh] flex items-center ">
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <img src={data.strapiAboutPage.Photo.formats.large.url} className="hidden md:block w-full md:border-8 md:border-white md:shadow-lg xl:-rotate-3"/>
          </div>
          <div className="md:col-span-2 pt-5 mb-10">
            <h1 className="md:px-6 xl:px-0 hidden md:block font-epicursive text-black font-bold text-6xl mb-5 mx-auto on-scroll">{data.strapiAboutPage.Title}</h1>
            <p className="md:bg-white md:text-black text-white md:p-6 xl:p-0 rounded-md xl:bg-transparent text-xl on-scroll leading-10 md:text-lg on-scroll mb-4">{data.strapiAboutPage.Description.data.Description}</p>
            <a href="https://fareharbor.com/embeds/book/guidedtoursnyc/?full-items=yes&language=en-us&u=f47e9dfd-04ed-4ca1-960c-04da78951fce&from-ssl=yes&ga4t=G-XDVQTYZ0FJ,974959174.1683229789__1684492288%3B&g4=yes&a=yes&back=https://rickiswalkingtours.com/" className="shadow-lg bg-rose-400 block sm:inline-block w-full sm:w-auto sm:inline-block text-center px-8 py-3 rounded-full text-white font-bold hover:bg-rose-500">Book a tour with me <FontAwesomeIcon icon={faArrowLeft}/></a>
            
          </div>
        </div>

      </div>
    </div>
  </Layout>
}

export const pageQuery = graphql`query MyQuery {
  strapiAboutPage(locale: {eq: "he-IL"}) {
    id
    Title
    Description {
      data {
        Description
      }
    }
    locale
    
    Photo {
      formats {
        medium {
          url
        }
        large {
          url
        }
      }
      url
    }
  }
}`;

export const Head = () => <Seo/>

export default AboutPage;