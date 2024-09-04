import React from 'react'
import Navbar from '../components/landingpage/Navbar'
import HeroSection from '../components/landingpage/HeroSection'
import NewUserSection from '../components/landingpage/NewUserSection'
import WhyUs from '../components/landingpage/WhyUs'
import Features from '../components/landingpage/Features'
import TopMentors from '../components/landingpage/TopMentors'
import MentorsCountCard from '../components/landingpage/MentorsCountCard'
import Footer from '../components/landingpage/Footer'

function LandingPage() {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <NewUserSection />
        <WhyUs />
        <Features />
        <TopMentors />
        <MentorsCountCard />
        <Footer />
    </div>
  )
}

export default LandingPage