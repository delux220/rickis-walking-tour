import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import Layout from '../components/layout';
import Seo from '../components/seo';



const FourOFourPage = () => {
	
	return <Layout lang={'en'} className="bg-teal-300">
		<div className="container mx-auto min-h-[70vh] justify-center flex items-center">
      <div className="text-center">
      <h1 className="md:px-6 xl:px-0 hidden md:block text-black font-bold text-6xl mb-5 mx-auto on-scroll">Page Not Found</h1>
        <p className="mb-6 block">The page you are looking for could not be found.</p>
        <p className="md:bg-white md:p-6 xl:p-0 rounded-md xl:bg-transparent text-xl on-scroll leading-10 md:text-lg on-scroll mb-4"></p>
        <Link to={'/'} className="bg-rose-400 block sm:inline-block w-full sm:w-auto sm:inline-block text-center px-8 py-3 rounded-full text-white font-bold hover:bg-rose-500"><FontAwesomeIcon icon={faArrowRight}/> Back Home</Link>
      </div>
    </div>
	</Layout>
}

export const Head = () => <Seo/>

export default FourOFourPage;