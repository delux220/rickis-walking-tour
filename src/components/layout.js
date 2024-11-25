import React, {useState, useEffect} from "react"
import {Link, Script, navigate, useStaticQuery, graphql} from 'gatsby';
import {MenuButton, Facebook, Instagram, YouTube, WhatsApp} from '../components/index';

const callback = function(entries) {
  entries.forEach(entry => {

    // Is the element in the viewport ?
    if (entry.isIntersecting) {

      // Add the fadeIn class:
      entry.target.classList.add("motion-safe:animate-fadeIn");
    } else {

      // Otherwise remove the fadein class
      //entry.target.classList.remove("motion-safe:animate-fadeIn");
    }
  });
};

const USA = () => {
	return <svg alt="American flag" aria-hidden="true" className="h-5 w-5 rounded-full mr-2" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-us" viewBox="0 0 512 512"><g fillRule="evenodd"><g strokeWidth="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"/></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"/><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z" transform="scale(3.9385)"/></g></svg>              
}

const Israel = () => {
	return <img alt="Israeli flag" className="object-cover h-5 w-5 rounded-full mr-2" src="https://res.cloudinary.com/meshed-nyc/w_200,h_200,c_fill/israel_tt2k7c.png"/>

}

const Layout = ({lang, children, className='', headerClass='', footerClass='bg-ricki', current=''}) => {

	const [open, setOpen] = useState(false);

	const [menuOpen, setMenuOpen] = useState(false);

	const data = useStaticQuery(graphql`
	    query HeaderQuery {
		  strapiSocialMedia {
		    Instagram
		    Facebook
		    YouTube
		  }
		}
	  `);

	const closeMenu = () => {
		setMenuOpen(false);
	}


	const changeLanguage = (language) => {

		var pathname =  document.location.pathname;

		if (language == lang) {
			return false;
		}

		if (pathname.indexOf('/posts/') !== -1) {
			
			if (language == 'he' && lang == 'en') {
				pathname = '/he/blog';
			} else if (language == 'en' && lang == 'he-IL') {
				pathname = '/blog';
			}
		} else if (language == 'he' && pathname == '/') {
			pathname = '/he';
		} else if (language == 'he' && lang == 'en') {
			
			pathname = '/he'+pathname;

		} else if (language == 'en' && lang == 'he-IL') {
			pathname = pathname.replace('/he', '');

		} else {
			pathname = pathname.replace('/he', '');
		}
		if (!pathname.includes('/he')) {
			window.location.href = 'https://rickiswalkingtours.com/';
		}

		//navigate(pathname);
	}

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
	
	return <main className={className}>
		<Script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes" />
		<header className={`${headerClass==''?'absolute z-20 md:relative text-white md:text-black md:bg-white':headerClass} py-4 w-full`}>
			<nav className="container mx-auto flex justify-between lg:px-3">
				<div className="flex items-center space-x-0 md:space-x-4">
				<Link to={lang=='en'?`/`:`/he`} className="hidden md:block font-epicursive text-2xl lg:text-3xl text-black font-bold"><img src="https://res.cloudinary.com/meshed-nyc/w_600,c_fill,q_auto/ricki-logo-blac_sa6r7u.png" className="h-20" alt="Ricki's Walking Tours"/></Link>
				<div>
				<button onClick={() => setOpen(!open)} id="language-button"  className="ml-3 md:ml-0 bg-white rounded-md  text-black  flex-shrink-0  border-white md:border-black z-10 inline-flex items-center py-2.5 px-4 text-sm lg:text-lg text-center md:font-goodlife font-bold" type="button">
		        {lang=='en'?<>
		        	<USA/> English (US)</>:<>
		       	    <Israel/> Hebrew (IL)
		        </>}
		         <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
		        
				    </button>
				    <div id="dropdown-states" className={`${open?'block':'hidden'} z-10 absolute bg-white rounded-lg shadow w-44 mt-1`}>
				        <ul className="py-2 text-sm text-black" aria-labelledby="states-button">
				            <li>
				                <button onClick={() => changeLanguage('en')} type="button" className="inline-flex w-full px-4 py-2 text-sm text-teal-900 hover:bg-rose-500 hover:text-white">
				                    <div className="inline-flex items-center">
				                    	<USA/>
				                        English (US)
				                    </div>
				                </button>
				            </li>
				            <li>
				                <button onClick={() => changeLanguage('he')}  type="button" className="inline-flex w-full px-4 py-2 text-sm text-teak-900 hover:bg-rose-500 hover:text-white ">
				                    <div className="inline-flex items-center">
				                    	<Israel/>
				                        Hebrew (IL)
				                    </div>
				                </button>
				            </li>
				        </ul>
				    </div>
    				</div>
				<span className="hidden md:block"><img alt="Phone icon" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1702996815/icons8-phone-30_bobcvq.png" className="w-5 inline-block mr-2"/><a href="tel:+13107755756" className="font-goodlife font-bold">(310) 775-5756</a></span>
				</div>
				<div>
				<MenuButton open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} className={` md:hidden z-50`}/>
				</div>
				<ul dir={lang=='he'?'rtl':'ltr'} className={`${menuOpen?'block motion-safe:animate-menuIn':'hidden md:!translate-x-0'} text-3xl bg-black/90 md:bg-transparent md:backdrop-blur-none backdrop-blur space-y-4 md:space-y-0 top-0 text-right font-calibri md:font-goodlife fixed md:relative h-screen md:h-auto right-0 w-10/12 md:w-auto md:flex  py-20 md:py-0 px-6 md:px-0  font-bold list-style-none md:space-x-8 md:text-base md:uppercase md:tracking-wider lg:text-lg lg:tracking-widest md:font-bold items-center`}>
					<li className="md:hidden"><Link onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}`}>{lang=='en'?'Home':'בית'}</Link></li>
					<li><Link className={`md:border-b-4 ${current=='about'?'md:border-ricki':'border-transparent'}`} onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}about`}>{lang=='en'?'About':'מי אני'}</Link></li>
					<li><Link onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}#tours`}>{lang=='en'?'Tours':'סיורים בעברית'}</Link></li>
					<li><Link className={`md:border-b-4 ${current=='concierge'?'md:border-ricki':'border-transparent'}`} onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}concierge`}>{lang=='en'?'Concierge':'תיכנון טיול'}</Link></li>
					<li><Link className={`md:border-b-4 ${current=='photography'?'md:border-ricki':'border-transparent'}`} onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}photography`}>{lang=='en'?'Photography':'צילומים מקצועיים'}</Link></li>
					<li><Link className={`md:border-b-4 ${current=='blog'?'md:border-ricki':'border-transparent'}`} onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}blog`}>{lang=='en'?'Blog':'המדריך לNY'}</Link></li>
					
					<li><Link onClick={closeMenu} to={`${lang=='en'?'/':'/he/'}#contact`} className="">{lang=='en'?'Contact':'צרו קשר'}</Link></li>
					<li className="pt-2 md:hidden"><div className="items-center justify-between flex  w-full ">
							<a href={data.strapiSocialMedia.Facebook} target="_blank"><Facebook className="hover:fill-white fill-white w-8 h-8"/></a>
							<a href={data.strapiSocialMedia.Instagram} target="_blank"><Instagram className="hover:fill-white fill-white w-8 h-8"/></a>
							<a href={data.strapiSocialMedia.YouTube} target="_blank"><YouTube className="hover:fill-white fill-white w-8 h-8"/></a>
							<a href="https://wa.me/13107755756" target="_blank"><WhatsApp className="hover:fill-white fill-white w-8 h-8"/></a>
						</div></li>
				</ul>
			</nav>
		</header>
		<div>
		{children}
		</div>
		<div className={footerClass}>
			<div className="container mx-auto px-6 py-10 text-center">
				<h3 className="text-gold mb-4 text-2xl font-bold font-goodlife text-center">{lang=='en'?'CONNECT WITH ME':'מדיה חברתית'}</h3>
						
				<div className="items-center justify-center flex space-x-8 max-w-lg mx-auto mb-8">
					<a href={data.strapiSocialMedia.Facebook} target="_blank"><Facebook className="hover:fill-white fill-black w-8 h-8"/></a>
					<a href={data.strapiSocialMedia.Instagram} target="_blank"><Instagram className="hover:fill-white fill-black w-8 h-8"/></a>
					<a href={data.strapiSocialMedia.YouTube} target="_blank"><YouTube className="hover:fill-white fill-black w-8 h-8"/></a>
					<a href="https://wa.link/w5o5ik" target="_blank"><WhatsApp className="hover:fill-white fill-black w-8 h-8"/></a>
					<a href="tel:+13107755756"><img alt="Phone icon" src="https://res.cloudinary.com/meshed-nyc/image/upload/v1702996815/icons8-phone-30_bobcvq.png" className="w-8"/></a>
				</div>
				<p>Copyright &copy; {new Date().getFullYear()}. Ricki's Walking Tours.</p>
			</div>
		</div>
		<a href="https://wa.link/w5o5ik" target="_blank" className="fixed z-40 bottom-5 right-5 xl:bottom-10 xl:right-10 w-14 h-14 flex bg-lime-500 shadow-lg items-center justify-center rounded-full"><WhatsApp className="fill-white w-8 h-8"/></a>
		</main>
}

export default Layout;