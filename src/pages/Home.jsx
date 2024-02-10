import React, { useState } from 'react'

import FeatureCard from '../componets/FeatureCard'
import Question1 from '../componets/Question1'
import './home.css'
import { Link } from 'react-router-dom'

const Home = (props) => {

  const [glassEffect, setGlassEffect] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      setGlassEffect(true);
    } else {
      setGlassEffect(false);
    }
  })

  return (
    <div className="home-container">
      <nav className={glassEffect ? "homenav glass" : "homenav"}>
        <div className="logo">⚡<span>SONIC</span></div>
        <div className='btn-ctn'>
          <button className="btn filled"><Link to="/login" className='link'>Login</Link></button>
          <button className="btn"><Link to="/registration" className='link'>Register→</Link></button>
        </div>
      </nav>


      <div className="home-hero">
        <div className="heroContainer home-hero1">
          <div className="home-container01">
            <h1 className="home-hero-heading heading1">
              Stream Your Favorite Music
            </h1>
            <span className="home-hero-sub-heading bodyLarge">
              <span>Discover and enjoy unlimited music on the go</span>
            </span>
            <div className="home-btn-group">
              <button className="buttonFilled "><Link to="/login" className='link'>Sign in</Link></button>
              <button className="buttonFlat"><Link to="/registration" className='link'>Get started →</Link></button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-features">
        <div className="featuresContainer">
          <div className="home-features1">
            <div className="home-container02">
              <span className="overline">
                <span>features</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">
                Discover the Features
              </h2>
              <span className="home-features-sub-heading bodyLarge">

                <span>Experience the best music streaming app</span>

              </span>
            </div>
            <div className="home-container03">
              <FeatureCard
                Heading="Unlimited Music Streaming"
                SubHeading="Access to a vast library of songs from various genres"
              ></FeatureCard>
              <FeatureCard
                Heading="Personalized Playlists"
                SubHeading="Curated playlists based on your music preferences"
              ></FeatureCard>
              <FeatureCard
                Heading="Global Artists"
                SubHeading="Listen to your favorite artist and listen to their latest songs"
              ></FeatureCard>
              <FeatureCard
                Heading="High-Quality Audio"
                SubHeading="Enjoy crystal clear sound with high-quality audio streaming"
              ></FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="home-pricing">
        <div className="pricingContainer">
          <div className="home-container04">
            <span className="overline">
              <span>Pricing</span>
              <br></br>
            </span>
            <h2 className="heading2">Choose Your Plan</h2>
            <span className="home-pricing-sub-heading bodyLarge">
              <span>
                <span>
                  Upgrade to unlock more features and enjoy an enhanced music
                  streaming experience.
                </span>
              </span>
            </span>
          </div>
          <div className="home-container05">
            <div className="freePricingCard home-pricing-card">
              <div className="home-container06">
                <span className="home-text36 heading3">Free</span>
                <span className="bodySmall">
                  Access to a limited selection of songs
                </span>
              </div>
              <div className="home-container07">
                <span className="home-text37">
                  <span>₹</span>
                </span>
                <span className="home-free-plan-price">0</span>
              </div>
              <div className="home-container08">
                <div className="home-container09">
                  <span className="home-text40">✔</span>
                  <span className="bodySmall">Ad-supported streaming</span>
                </div>
                <div className="home-container10">
                  <span className="home-text41">✔</span>
                  <span className="bodySmall">Create and save playlists</span>
                </div>
                <div className="home-container11">
                  <span className="home-text42">✔</span>
                  <span className="bodySmall">Shuffle play</span>
                </div>
                <div className="home-container12">
                  <span className="home-text43">✔</span>
                  <span className="bodySmall">Limited skips</span>
                </div>
              </div>
              <button className="home-button buttonOutline">
                Continue with Free
              </button>
            </div>
            <div className="basicPricingCard home-pricing-card1">
              <div className="home-container13">
                <span className="home-text44 heading3">BASIC</span>
                <span className="bodySmall">
                  Access to a wider range of songs
                </span>
              </div>
              <div className="home-container14">
                <span className="home-text45">
                  <span>₹</span>
                </span>
                <span className="home-basic-plan-pricing">199</span>
                <span className="home-text48">/ month</span>
              </div>
              <div className="home-container15">
                <div className="home-container16">
                  <span className="home-text49">✔</span>
                  <span className="bodySmall">All features of FREE plan</span>
                </div>
                <div className="home-container17">
                  <span className="home-text51">✔</span>
                  <span className="bodySmall">Ad-free streaming</span>
                </div>
                <div className="home-container18">
                  <span className="home-text52">✔</span>
                  <span className="bodySmall">Create and save playlists</span>
                </div>
                <div className="home-container19">
                  <span className="home-text53">✔</span>
                  <span className="bodySmall">Unlimited skips</span>
                </div>
                <div className="home-container20">
                  <span className="home-text54">✔</span>
                  <span className="bodySmall">Offline listening</span>
                </div>
              </div>
              <button className="home-button1 buttonFilledSecondary">
                Try the Basic plan
              </button>
            </div>
            <div className="proPricingCard home-pricing-card2">
              <div className="home-container21">
                <span className="home-text55 heading3">
                  <span>PRO</span>
                  <br></br>
                </span>
                <span className="bodySmall">
                  Access to the entire music library
                </span>
              </div>
              <div className="home-container22">
                <span className="home-text58">
                  <span>₹</span>
                  <span></span>
                </span>
                <span className="home-pro-plan-pricing">1499</span>
                <span className="home-text61">/ year</span>
              </div>
              <div className="home-container23">
                <div className="home-container24">
                  <span className="home-text62">✔</span>
                  <span className="bodySmall"> All features of BASIC plan</span>
                </div>
                <div className="home-container25">
                  <span className="home-text64">✔</span>
                  <span className="bodySmall">Ad-free streaming</span>
                </div>
                <div className="home-container26">
                  <span className="home-text65">✔</span>
                  <span className="bodySmall">Create and save playlists</span>
                </div>
                <div className="home-container27">
                  <span className="home-text66">✔</span>
                  <span className="bodySmall">Unlimited skips</span>
                </div>
                <div className="home-container28">
                  <span className="home-text67">✔</span>
                  <span className="bodySmall">Offline listening</span>
                </div>
              </div>
              <button className="home-button2 buttonFilledSecondary">
                Try the PRO plan
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-banner">
        <div className="bannerContainer home-banner1">
          <h1 className="home-banner-heading heading2">
            Listen to Music Anytime, Anywhere
          </h1>
          <span className="home-banner-sub-heading bodySmall">
            <span>
              With our music streaming app, you can access a vast library of
              songs from various genres and artists. Whether you&apos;re
              into pop, rock, hip-hop, or classical, we have it all covered.
              Our app allows you to create personalized playlists, follow
              your favorite artists, and explore new music recommendations
              tailored to your taste.
            </span>
          </span>
          <button className="buttonFilled">Learn More</button>
        </div>
      </div>
      <div className="home-faq">
        <div className="faqContainer">
          <div className="home-faq1">
            <div className="home-container29">
              <span className="overline">
                <span>FAQ</span>
                <br></br>
              </span>
              <h2 className="home-text85 heading2">Common questions</h2>
              <span className="home-text86 bodyLarge">
                <span>
                  Here are some of the most common questions that we get.
                </span>
                <br></br>
              </span>
            </div>
            <div className="home-container30">
              <Question1
                Answer="To create an account, click on the 'Register' button and fill out the required information."
                Question="How do I create an account?"
              ></Question1>
              <Question1
                Answer="Yes, our app allows you to download songs and listen to them offline."
                Question="Can I listen to music offline?"
              ></Question1>
              <Question1
                Answer="To cancel your subscription, go to your account settings and follow the instructions to cancel."
                Question="How can I cancel my subscription?"
              ></Question1>
              <Question1
                Answer="Yes, we offer a free version of the app with limited features. You can upgrade to a premium version for additional benefits."
                Question="Is there a free version of the app?"
              ></Question1>
              <Question1
                Answer="Our app is available on both iOS and Android devices. You can download it from the respective app stores."
                Question="What devices are supported by the app?"
              ></Question1>
            </div>
          </div>
        </div>
      </div>
      <div className="home-footer"></div>
    </div>
  )
}

export default Home
