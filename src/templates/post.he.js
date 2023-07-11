import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, WhatsApp} from '../components/index';
import {faArrowRight, faEnvelope, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import moment from 'moment';
import Layout from '../components/layout';
import Seo from '../components/seo';

const HebrewPost = ({pageContext}) => {

	const url = `https://rickiswalkingtours.com/blog/${pageContext.data.Slug}`;

	console.log(pageContext);
	
	return <Layout lang={'en'} className="bg-ricki" current="blog">
		<div className="h-[80vh] bg-cover bg-center relative" style={{backgroundImage: `url('${pageContext.data.Image.url}')`}}>
			<div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black/60">
				<div className="max-w-5xl mx-auto px-4 py-20">
					<div className="mb-3">
					<Link to={`/blog`} className="text-rose-400 text-xl font-bold ">Blog</Link>
					</div>
					<h1 className="text-white font-goodlife text-5xl font-bold mb-3">{pageContext.data.Title}</h1>
					<h3 className="text-white mb-4">By Ricki Sofer &middot; {moment(pageContext.data.publishedAt).fromNow()}</h3>
					<div className="flex items-center space-x-4">
						<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className="fill-white hover:fill-rose-400"><Facebook className="w-5 h-5"/></a>
						<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className="fill-white hover:fill-rose-400"><Twitter className="w-5 h-5"/></a>
						<a href={`mailto:?body=${url}`} className="text-white text-lg hover:text-rose-400"><FontAwesomeIcon icon={faEnvelope}/></a>
						<button className="text-white text-lg hover:text-rose-400"><FontAwesomeIcon icon={faShareNodes}/></button>
					</div>
				</div>
			</div>
		</div>
		<div className="bg-white py-10">
			<div className="max-w-5xl px-4 mx-auto">
				<div className="mb-3">
					<span className="font-bold text-gray-600 italic block mb-3">Published on <span className="italic text-ricki">{moment(pageContext.data.publishedAt).format('MMMM DD, YYYY')}</span></span>
					<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="w-32 block"/>

				</div>
				<div id="post" className="lg:col-span-2 text-lg leading-10" dangerouslySetInnerHTML={{__html: pageContext.data.Content.data.Content}}>

				</div>

				<div className="my-8">
					<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer-different-pink_oajuo7.png" className="block w-48"/>
				</div>

				<div>

				<div className="flex items-center space-x-4 mb-8">
					<span className="font-goodlife font-bold text-black text-xl">Share with Friends:</span>
					<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className="fill-ricki hover:fill-rose-400"><Facebook className="w-5 h-5"/></a>
					<a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} className="fill-ricki hover:fill-rose-400"><Twitter className="w-5 h-5"/></a>
					<a href={`mailto:?body=${url}`} className="text-ricki text-lg hover:text-rose-400"><FontAwesomeIcon icon={faEnvelope}/></a>
					<button className="text-ricki text-lg hover:text-rose-400"><FontAwesomeIcon icon={faShareNodes}/></button>
				</div>
				</div>
				{pageContext.author&&<div className="border rounded-xl px-4 py-4 on-scroll mb-8">
					<div className="sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
						<div className="mb-4 sm:mb-0">
							<img src={pageContext.author.Photo.url} className="rounded-full"/>
						</div>
						<div className="col-span-2 lg:col-span-3">
							<h3 className="text-2xl font-bold font-goodlife mb-2 text-center sm:text-left">{pageContext.author.Title}</h3>
							<div className="items-center flex space-x-4 mb-4 justify-center sm:justify-start">
								<a href="#" target="_blank"><Facebook className="hover:fill-black fill-slate-600 w-5 h-5"/></a>
								<a href="#" target="_blank"><Instagram className="hover:fill-black fill-slate-600 w-5 h-5"/></a>
								<a href="#" target="_blank"><YouTube className="hover:fill-black fill-slate-600 w-5 h-5"/></a>
								<a href="https://wa.link/w5o5ik" target="_blank"><WhatsApp className="hover:fill-black fill-slate-600 w-5 h-5"/></a>
							</div>
							<p className="mb-3">{pageContext.author.Description}</p>
							<Link to={'/#tours'} className="w-full md:w-auto md:inline-block text-xl sm:text-base font-bold font-sans bg-rose-400 shadow-lg text-white rounded-full px-6 py-2 block text-center">Book a tour with me</Link>
						</div>
					</div>
				</div>}
				{pageContext.nextPost!=null&&<div>
					<h3 className="text-lg mb-3 font-bold">What to Read Next...</h3>
					<div className="sm:grid grid-cols-3 gap-5 mb-8">
					<div className="mb-4 sm:mb-0">
						<Link to={`/posts/${pageContext.nextPost.node.Slug}`} className="block"><img src={pageContext.nextPost.node.Image.formats.large.url} className="rounded-xl object-cover aspect-[5/4]"/></Link>
					</div>
					<div className="col-span-2">
						<Link className="block text-2xl font-bold font-goodlife" to={`/posts/${pageContext.nextPost.node.Slug}`}>{pageContext.nextPost.node.Title}</Link>
						<p className="text-sm mb-2 text-gray-600">Published {moment(pageContext.nextPost.node.publishedAt).fromNow()}</p>
						<p className="mb-3">{pageContext.nextPost.node.Content.data.Content.replace(/(<([^>]+)>)/gi, "").substr(0, 250)}...</p>
						<div className="">
								<Link className="block w-full md:w-auto md:inline-block text-center shadow-lg bg-rose-400 px-6 py-2 font-bold text-white rounded-full inline-block" to={`/posts/${pageContext.nextPost.node.Slug}`}><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Read Post</Link>
						</div>
					</div>
				</div>
				</div>}

				
			</div>
		</div>
	</Layout>
}


export const Head = ({location}) => (<Seo location={location}/>)

export default HebrewPost;