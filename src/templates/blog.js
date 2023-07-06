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

const Blog = ({pageContext}) => {

	console.log(pageContext);
	
	return <Layout lang={'en'} className="bg-ricki dark" current="blog">
		<div className="bg-white">
		<div className="container mx-auto px-4">
			<div className="pt-20 md:pt-10 mb-10">
				<h1 className="text-5xl font-goodlife font-bold">{pageContext.title}</h1>
			</div>
			<div className="space-y-8">
				{
					pageContext.data.map(edge => {
						const text = edge.node.Content.data.Content.replace(/(<([^>]+)>)/gi, "").substr(0, 250);
						return <div key={edge.node.id} className="md:grid md:grid-cols-5 lg:grid-cols-6 gap-4">
						<div className="col-span-2 mb-4 md:mb-0">
							<Link className="block" to={`/posts/${edge.node.Slug}`}><img src={edge.node.Image.formats.large.url} className="aspect-square sm:aspect-[4/3] w-full object-cover rounded-xl"/></Link>
						</div>
						<div className="col-span-3">
							<Link className="hover:text-ricki font-goodlife text-3xl font-bold" to={`/posts/${edge.node.Slug}`}>{edge.node.Title}</Link>
							<p className="text-sm text-gray-600 mb-2">Published {moment(edge.node.publishedAt).fromNow()}</p>
							<div className="mb-2">
							<p>{text}...</p>
							</div>
							<div className="mb-2">
								<Link className="block w-full md:w-auto md:inline-block text-center shadow-lg bg-rose-400 px-6 py-2 font-bold text-white rounded-full inline-block" to={`/posts/${edge.node.Slug}`}><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Read Post</Link>
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


export const Head = ({location}) => (<Seo location={location}/>)

export default Blog;