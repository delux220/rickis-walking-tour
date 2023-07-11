import React, {useState, useEffect} from "react"
import {Link, graphql, Script, navigate} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, WhatsApp} from '../components/index';
import {faArrowRight, faEnvelope, faArrowLeft, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import moment from 'moment';
import Layout from '../components/layout';
import Seo from '../components/seo';

const HebrewBlog = ({pageContext}) => {

	console.log(pageContext);
	
	return <Layout lang={'he-IL'} className="bg-ricki dark" current="blog">
		<div className="bg-white min-h-[70vh]">
		<div className="container mx-auto px-4">
			<div className="pt-20 md:pt-10 mb-10">
				<h1 className="text-5xl font-goodlife font-bold text-right">{pageContext.title}</h1>
			</div>
			<div className="space-y-8">
				{
					pageContext.data.length==0&&<div>
						<span className="block mb-8">Check back soon for articles</span>

						<Link to={'/'} className="text-ricki">Back</Link>

					</div>
				}
				{
					pageContext.data.map(edge => {
						const text = edge.node.Content.data.Content.replace(/(<([^>]+)>)/gi, "").substr(0, 250);
						return <div dir="rtl" key={edge.node.id} className="md:grid md:grid-cols-5 lg:grid-cols-6 gap-4">
						<div className="col-span-2 mb-4 md:mb-0">
							<Link className="block" to={`/he/posts/${edge.node.Slug}`}><img src={edge.node.Image.formats.large.url} className="aspect-square sm:aspect-[4/3] w-full object-cover rounded-xl" alt={edge.node.Image.alternativeText}/></Link>
						</div>
						<div className="col-span-3">
							<Link className="hover:text-ricki font-goodlife text-3xl font-bold" to={`/he/posts/${edge.node.Slug}`}>{edge.node.Title}</Link>
							<p className="text-sm text-gray-600 mb-2">Published {moment(edge.node.publishedAt).fromNow()}</p>
							<div className="mb-2">
							<p>{text}...</p>
							</div>
							<div className="mb-2">
								<Link className="block w-full md:w-auto md:inline-block text-center shadow-lg bg-rose-400 px-6 py-2 font-bold text-white rounded-full inline-block" to={`/he/posts/${edge.node.Slug}`} ><FontAwesomeIcon icon={faArrowLeft} className="ml-2"/>Read Post</Link>
							</div>
							
						</div>
					</div>})
				}
			</div>
			<div className="block py-10">
			<div className="flex justify-between items-center">
				{
					pageContext.page==2&&<Link className="block" to={`/blog`}><FontAwesomeIcon icon={faArrowLeft}/> Newer Posts</Link>
				}
				{
					pageContext.page>2&&<Link className="block" to={`/blog/${pageContext.page-1}`}><FontAwesomeIcon icon={faArrowLeft}/> Newer Posts</Link>
				}
				{
					pageContext.hasMore&&<Link className="block" to={`/blog/${pageContext.page+1}`}><FontAwesomeIcon icon={faArrowRight}/> Older Posts</Link>
				}
			</div>
			</div>
		</div>
		</div>
	</Layout>
}


export const Head = ({location, pageContext}) => {

	return <>
		 <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
	      <link rel="alternate" hreflang="en" href={`https://rickiswalkingtours${pageContext.uri}`} />
			<link rel="alternate" hreflang="he-IL" href={`https://rickiswalkingtours.com/he${pageContext.uri}`} />
	      <title>{pageContext.blog.Title}</title>
	      <meta name="description" content={pageContext.blog.Description} />
	      <meta property="og:title" content={pageContext.blog.Title} />
	      <meta property="og:description" content={pageContext.blog.Description} />
	      <meta property="og:type" content="website" />
	      <meta name="twitter:card" content="summary" />
	      {pageContext.blog.Image&&<meta property="og:image" content={pageContext.blog.Image.url}/>}
	      <meta name="twitter:title" content={pageContext.blog.Title} />
	      <meta name="twitter:description" content={pageContext.blog.Description} />
	</>};

export default HebrewBlog;