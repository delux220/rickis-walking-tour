module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    	fontSize: {
    		'10xl': ['12rem', '11rem'],
    		'9.5xl': ['11rem', '10rem'],
        '11xl': ['13rem', '12rem'],
        '12xl': ['14rem', '12rem'],
        '13xl': ['15rem', '13rem']
    	},
    	fontFamily: {
        'chantal' : ['chantal', 'sans-serif'],
        'sans' : ['museo-sans', 'sans-serif'],
        'calibri' : ['calibri', 'sans-serif'],
        'cherokee': ['phoreuscherokee', 'serif'],
        'doublebass' : ['doublebass', 'serif'],
        'crayonette': ['crayonette-djr', 'serif'],
        'santelia': ['santelia-rough-two', 'cursive'],
        'epicursive' : ['epicursive', 'cursive'],
        'active' : ['active-one', 'cursive'],
        'goodlife': ['goodlife-sans', 'sans-serif']

    	},
    	animation: {
        fadeIn: "fadeIn .5s ease-in forwards",
        bounceIn: "bounceIn .5s ease-in forwards",
        loadIn: "loadIn .2s ease-in forwards",
        slowScroll: "scrollDown 5s ease-in forwards",
        menuIn: "menuInRight .2s ease-in forwards",
        menuOut: "menuOutRight .2s ease-in forwards",
        loader: "scale .33s ease-out forwards",
        hide: "hide .1s ease-in forwards",
        fadeOut: "fadeOut 1s ease-in forwards",
        fadeOutQuick: "fadeOutQuick .5s ease-in forwards",
        fadeInLeft: "fadeInLeft .5s ease-in forwards",
        fadeInRight: "fadeInRight .5s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        fadeInLeft: {
        	"0%": {transform: 'translate(-20px, 0px)', opacity: 0},
          "100%": {transform: 'translate(0, 0)', opacity: 1},
        },
        fadeInRight: {
        	"0%": {transform: 'translate(20px, 0px)', opacity: 0},
          "100%": {transform: 'translate(0, 0)', opacity: 1},
        },
        fadeOutQuick: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 }
        },
        fadeOut: {
          "0%": {transform: 'scale(1)', opacity: 1 },

          "100%": {transform: 'scale(1.5)', opacity: 0 }
        },
        bounceIn: {
          "0%": {transform: 'translate(0px, 20px)', opacity: 0},
          "100%": {transform: 'translate(0, 0)', opacity: 1},
        },
        loadIn: {
          "0%": {transform: 'translate(0px, 20px)', opacity: 0},
          "100%": {transform: 'translate(0, 0)', opacity: 1},
        },
        scrollDown: {
          "0%": {transform: 'translate(0, 0)', opacity: 1},
          "10%": {transform: 'translate(0, 0)', opacity: 1},
          "100%": {transform: 'translate(0, -50%)', opacity: 1},
        },
        menuInRight: {
          "0%": {transform: 'translate(100%, 0)', opacity:0},
          "100%": {transform: 'translate(0, 0)', opacity:1}
        },
        menuOutRight: {
          "0%": {transform: 'translate(0, 0)', opacity:1},
          "100%": {transform: 'translate(100%, 0)', opacity:1, display:'none'}
        },
        scale: {
          "0%": {transform : 'scale(1)', opacity:1},
          "90%": {transform: 'scale(25)', opacity: 1},
          "99.9%": {transform: 'scale(25)', opacity: 0},
          "100%": {transform: 'scale(0)', opacity: 0}
        }
      }


    }
  },
  plugins: [],
  variants: {
      animation: ["motion-safe"]
  },
}