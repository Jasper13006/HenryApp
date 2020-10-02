import React from 'react';
import NavBar from '../components/home/NavBar';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Portfolio from '../components/home/Portfolio';
import CallToAction from '../components/home/CallToAction';
import Contact from '../components/home/Contact';
import Footer from '../components/home/Footer';

const Home = () => {

    return (
        <>            
            <NavBar />            
            <Hero />                    
            <About />            
            <Services />             
            <Portfolio />            
            <CallToAction />            
            <Contact />            
            <Footer />                              
        </>
    )
}

export default Home;
