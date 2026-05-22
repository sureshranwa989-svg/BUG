import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import Categories from '../components/Categories'
import NewArrivals from '../components/NewArrivals'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeaturedProducts/>
      <Categories/>
      <NewArrivals/>
      <Footer/>
    </div>
  )
}

export default Home
