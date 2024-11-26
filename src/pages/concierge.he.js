import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {WhatsApp} from '../components/index';
import {faArrowRight, faArrowLeft, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';



const HebrewConciergePage = ({data}) => {
  
  return <Layout lang={'he'} className="bg-white" footerClass="bg-light" current="concierge">
      <div className="bg-white pb-10 min-h-screen">
        <div className="md:container mx-auto xl:px-0" dir="rtl">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 xl:gap-8">
            <div className="bg-cover bg-center h-[80vh] md:hidden px-3 py-10 flex items-end justify-center" style={{backgroundImage: "url('"+data.strapiConcierge.Image.formats.large.url+"')"}}>
              <div>
                <h1 className=" block w-full text-center text-white font-bold text-5xl font-epicursive mb-4">{data.strapiConcierge.Title}</h1>
               
              </div>
            </div>
            <div className="hidden md:block">
              {
                data.strapiConcierge.Image.formats.large!=null?<img alt="Ricki Sofer, Concierge service, NYC" src={data.strapiConcierge.Image.formats.large.url} className="w-full hidden md:block"/>:<img alt="Ricki Sofer, Concierge service, NYC" src={data.Image.url} className="w-full hidden md:block"/>
              }

            </div>
            <div className="lg:col-span-2 py-5 px-4 md:px-0">
              <h1 className="hidden md:block font-bold text-5xl font-epicursive mb-4">{data.strapiConcierge.Title}</h1>
              <div className="pl-1 mb-4">
              
              <div id="post" dangerouslySetInnerHTML={{__html: data.strapiConcierge.Content.data.Content}}/>
              </div>
              <div>
                <a href="https://wa.link/w5o5ik" target="_blank" class="button primary inline-block"><WhatsApp className="hover:fill-black fill-black w-5 h-5 ml-2 inline-block"/><span>צרו קשר בוואטסאפ</span></a>
              </div>
            </div>


          </div>
        </div>
      </div>
  </Layout>
}

export const pageQuery = graphql`query MyQuery {
  strapiConcierge(locale: {eq: "he-IL"}) {
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

export const Head = ({location, data}) => <Seo page="concierge" location={location} lang="he-IL" title={data.strapiConcierge.Title} description={data.strapiConcierge.Description}/>

export default HebrewConciergePage;