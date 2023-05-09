import React, {useState, useEffect} from "react"
import {Link, graphql} from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {YouTube, Instagram, Facebook, TikTok, Twitter, MenuButton} from '../components/index';
import {faArrowRight, faEnvelope} from '@fortawesome/free-solid-svg-icons';

const callback = function(entries) {
  entries.forEach(entry => {

    // Is the element in the viewport?
    if (entry.isIntersecting) {

      // Add the fadeIn class:
      entry.target.classList.add("motion-safe:animate-fadeIn");
    } else {

      // Otherwise remove the fadein class
      //entry.target.classList.remove("motion-safe:animate-fadeIn");
    }
  });
};

const tours = [
	{id: 'chinatown', title: 'Historic Food Tour: Chinatown, Little Italy, Soho', image_url: 'https://img1.wsimg.com/isteam/ip/ad1fcdf3-3963-479c-8cfd-d58a2c0ceb15/0Y4A7246-2.jpg/:/cr=t:16.67%25,l:0%25,w:100%25,h:66.65%25/rs=w:1200,h:1200,cg:true', description: 'Explore 3 of New York neighborhoods renowned for their food culture, Soho, Little Italy and Chinatown, on this tasting tour. Follow your guide to learn about the history of each neighborhood through gourmet food samples at eateries loved and revered by locals. Food tour includes 5-6 food Sampling & entrance to a museum walking through the most iconic neighborhoods in NYC.', price: 125},
	{id: 'dumbo', title: 'Brooklyn Bridge & Dumbo Photo TOUR', image_url: 'https://img1.wsimg.com/isteam/ip/ad1fcdf3-3963-479c-8cfd-d58a2c0ceb15/IMG_4854.jpg/:/cr=t:16.68%25,l:0%25,w:100%25,h:66.64%25/rs=w:1200,h:1200,cg:true', description: 'Take an iconic walk across the famous Brooklyn bridge while striking a pose & learning some of the most fascinating history about the landmark. We will be crossing the bridge from Brooklyn to Manhattan & enjoy the view of all Manhattan! A preview link will be provided to all the photos. You can pick up to 1 complimentary (5x7) and purchase as many extra photos as you want. 10 High Quality photos are included on all private group bookings.', price: 55},
	{id: 'photo', title: 'SoHo, Chinatown & Little Italy Photo Tour', image_url: 'https://img1.wsimg.com/isteam/ip/ad1fcdf3-3963-479c-8cfd-d58a2c0ceb15/0Y4A4489-2.jpg/:/cr=t:16.68%25,l:0%25,w:100%25,h:66.64%25/rs=w:1200,h:1200,cg:true', description: "Join me to the most photographed neighborhood in NYC with the Cast Iron Buildings & cobble stone to create the perfect NYC background. Soho is the neighborhoods with a distinguished look that is only unique to soho. Over 200 Cast Iron buildings & floor made of romantic cobble stone. In the tour, you will find the fascinating history of Soho, how it started & why it's SO expensive today. We will take iconic pictures with luxury stores in the background, with a yellow cab as a true New Yorker, all as we learn the history of the buildings!", price: 55},
	{id: 'greenwich', title: 'Greenwich Village Hidden History Tour', image_url: 'https://img1.wsimg.com/isteam/ip/ad1fcdf3-3963-479c-8cfd-d58a2c0ceb15/Screen%20Shot%202022-05-16%20at%205.10.44%20PM.png/:/cr=t:0%25,l:16.31%25,w:67.39%25,h:100%25/rs=w:600,h:600,cg:true', description: "Walk trough a beautiful garden that used to be a women's house of detention. Stand where the first battle-lines were drawn in the fight for gay rights. Stroll Washington Square Park, a peaceful oasis built atop a forgotten cemetery", price: 55},
	{id: 'music', title: 'Bars & Live Music Tour', image_url: 'https://img1.wsimg.com/isteam/ip/ad1fcdf3-3963-479c-8cfd-d58a2c0ceb15/xx.jpg/:/cr=t:0%25,l:16.67%25,w:66.67%25,h:100%25/rs=w:1170,h:1170,cg:true', description: "Explore local bars with live music (Jazz) Visit celebrities favorite piano bar & sing along to broadway showtunes. Dance where Bob Dylan & Jimi Hendrix started their careers. Eat the best late night Pizza where  Spiderman use to work :) Check out the oldest Tavern in NYC. See where Hamingway, Eugene O'Neill  & many more use to drink nightly! Look into the best Stand Up comedy clubs in the world & see where comedians got their start!", price: 125},
];

const IndexPage = () => {

	useEffect(() => {
		const targets = document.querySelectorAll(".on-scroll");

	    // Set up a new observer
	    const observer = new IntersectionObserver(callback);

	    // Loop through each of the target
	    targets.forEach(function(target) {
	      // Hide the element
	      target.classList.add("opacity-0");

	      // Add the element to the watcher
	      observer.observe(target);
	    });
	}, [])
	return <main className=" min-h-screen">
		<header className="absolute md:relative text-teal-800 py-4">
			<nav className="container mx-auto flex justify-between px-6">
				<div className="flex items-center space-x-4">
				<Link to={`/`} className="font-epicursive text-3xl text-black font-bold">Ricki's Walking Tours</Link>
				<a href="#"><Facebook className="hover:fill-white fill-black w-5 h-5"/></a>
							<a href="#"><Instagram className="hover:fill-white fill-black w-5 h-5"/></a>
							<a href="#"><YouTube className="hover:fill-white fill-black w-5 h-5"/></a>
				</div>
				<ul className="font-calibri text-teal-900 font-bold list-style-none flex space-x-4 uppercase text-base items-center">
					
					<li><Link to={`/photography`}>About</Link></li>
					<li><Link to={`/photography`}>Photography</Link></li>
					<li><Link to={`/photography`}>Tours</Link></li>
					<li><Link to={`/photography`} className="bg-black px-4 py-2 text-white font-bold rounded-full">Contact</Link></li>
				</ul>
			</nav>
		</header>
		<section className="bg-cover relative bg-center h-[90vh] md:hidden bg-[url(https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg)]">
			<div className="absolute w-full bottom-0  from-teal-300 via-transparent to-transaprent px-0">
				<h1 className="text-center font-epicursive text-white font-bold text-6xl mb-3 mx-auto on-scroll" >Hey<span className="translate-y-4 inline-block">,</span> I'm Ricki!</h1>
				<h3 className=" font-goodlife text-white text-center font-bold text-2xl mb-3 uppercase font-bold ">Your Guide to NYC</h3>
				<div className="space-y-2 mb-8 px-10">
				<button className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 text-white text-center block w-full rounded-full px-10 py-3 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Book a Tour</button>
				<button className="font-bold font-sans border border-white bg-white text-black rounded-full px-10 py-3 text-center block w-full"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>Contact Me</button>
				</div>
			</div>
		</section>
		<section className="bg-white hidden md:block">
		<div className=" bg-repeat-x bg-[center_bottom_-5rem] xl:bg-[center_bottom_-12rem]  bg-contain bg-[url(https://res.cloudinary.com/meshed-nyc/image/upload/v1683537115/skyline_adobe_express_ekdtpp.svg)]">
		<div className="container mx-auto h-[90vh] px-6 py-20 flex items-center space-x-8 xl:space-x-10  ">

			<img src="https://res.cloudinary.com/meshed-nyc/q_auto/IMG_8118_atrpdt.jpg" className="border-8 h-full shadow-xl border-white -rotate-2 motion-safe:animate-fadeIn"/>
			<div className="">
				<h1 className="font-epicursive text-black font-bold text-7xl mb-8 mx-auto on-scroll" >Hey<span className="translate-y-4 inline-block">,</span> I'm Ricki!</h1>
				<h3 className=" font-goodlife text-teal-900 font-bold text-3xl mb-4 uppercase font-bold ">Your Guide to NYC</h3>
				<h3 className=" text-teal-900  text-lg font-sans mb-4 block xl:max-w-lg">I'm a photographer 📷, licensed NYC tour guide 🗽, part-time stand up comedian 🎤, and full-time adventurer!</h3>
				<button className="font-bold font-sans border border-rose-400 bg-rose-400 mr-4 text-white rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Book a Tour</button>
				<button className="font-bold font-sans border border-black text-black rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faEnvelope} className="mr-4"/>Contact Me</button>
			</div>
		</div>
		</div>
		</section>
		<section className="bg-teal-300 py-20">
			<div className="container mx-auto px-6">
			<h2 className="mb-20 text-5xl text-black font-bold font-goodlife">My Tours</h2>
			<div className="sm:grid grid-cols-2 gap-8">
				{
					tours.map(tour => <div key={`tour-${tour.id}`} className="lg:flex space-x-4 on-scroll mb-6 sm:mb-0">
							
								<img src={tour.image_url} className="rounded-full mb-4 lg:mb-0 w-full aspect-square lg:w-64 lg:h-64 border-white border-8" />

							<div>
								<h3 className="font-bold text-2xl font-goodlife text-black">{tour.title}</h3>
								<img src="https://res.cloudinary.com/meshed-nyc/image/upload/v1683420929/squiggle-longer_lciuww.png" className="w-48 block my-3"/>
								<p className="text-teal-900 mb-4">{tour.description}</p>
								<button className="w-full md:w-auto text-xl sm:text-base font-bold font-sans bg-rose-400 mr-4 shadow-lg text-white rounded-full px-6 py-2 block text-center"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Book Tour</button>
							</div>
						</div>)
				}
				</div>
			</div>
		</section>
		<section className="bg-teal-300">
			<div className="rounded-lg px-6  container mx-auto py-8 md:py-20">
				<div className="md:grid grid-cols-2">
					<img src="https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg" className="lg:hidden block on-scroll"/>
					<div className="hidden lg:block bg-fixed bg-[url(https://res.cloudinary.com/meshed-nyc/w_800,c_fill/v1683559297/brooklyn_rqodbm.jpg)]  bg-no-repeat bg-top-left w-full md:h-128 border-8 border-white shadow-xl ">
						&nbsp;
					</div>
					<div className=" lg:px-8 py-6 on-scroll">
						<h3 className="text-black text-4xl font-bold font-goodlife">Destination Photography</h3>
						<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer_lciuww.png" className="w-48 block my-3"/>
						<h5 className="font-goodlife text-black text-lg font-bold mb-1">Why Take Pictures With Me?</h5>
						<p className="text-teal-900 mb-4">If you hate taking pictures, if you find yourself frozen infront of the camera, if you need someone cool to pretend you're not about to propose, I'm your gal. In addition to having a top notch photography equipment I'm also a director and a great ice breaker so we can get you to look in your own element as soon as the first photo. Before the session we go over wardrobe options, figure out the best location & get to know each other so we can have fun during the photoshoot. I'm a NYC local, also work as a tour guide & familiar with the best spots around town. You will learn the history as we take your fabulous photos :D</p>
						<div className="flex items-center space-x-4">
						<button className="px-6 py-2 bg-rose-400 shadow-lg text-white rounded-full font-bold inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-2"/>Purchase</button>
						<span className="font-bold text-black text-xl">$300</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section className="bg-teal-400 py-20">
			<div className="container mx-auto px-6">
				<div className="lg:grid grid-cols-2 gap-10 space-y-20 lg:space-y-0">
					<div className="on-scroll">
						<h3 className="text-black text-4xl font-bold font-goodlife">Have Questions? Contact me!</h3>
												<img src="https://res.cloudinary.com/meshed-nyc/squiggle-longer_lciuww.png" className="w-48 block my-3"/>

						<form>
							<div className="space-y-3">
								<div>
									<label className="block text-sm font-bold">Name *</label>
									<input type="text" className="bg-white rounded-md px-4 py-2 w-full block" />
								</div>
								<div>
									<label className="block text-sm font-bold">Email Address *</label>
									<input type="email" className="bg-white rounded-md px-4 py-2 w-full block" />
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-bold">Requested Dates for Your Tour</label>
										<input type="email" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
									<div>
										<label className="block text-sm font-bold">Number of Guests</label>
										<input type="number" className="bg-white rounded-md px-4 py-2 w-full block" />
									</div>
								</div>
								<div className="">
									<label className="block text-sm font-bold">Message</label>
									<textarea rows={3} className="bg-white rounded-md px-4 py-2 w-full block" placeholder="What tour are you interested in? Do you have a special request?"></textarea>
								</div>
								<button className="font-bold font-sans border border-black bg-black mr-4 text-white text-center block w-full sm:w-auto rounded-full px-10 py-4 inline-block"><FontAwesomeIcon icon={faArrowRight} className="mr-4"/>Send Message</button>

							</div>
						</form>
					</div>
					<div className="on-scroll">
						<h3 className="text-black text-4xl font-bold font-goodlife text-center mb-8">CONNECT WITH ME</h3>
						<div className="items-center justify-center flex space-x-8">
							<a href="#"><Facebook className="hover:fill-white fill-black w-20 h-20"/></a>
							<a href="#"><Instagram className="hover:fill-white fill-black w-20 h-20"/></a>
							<a href="#"><YouTube className="hover:fill-white fill-black w-20 h-20"/></a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div className=" bg-teal-400">
			&nbsp;
		</div>
	</main>
}

export default IndexPage;