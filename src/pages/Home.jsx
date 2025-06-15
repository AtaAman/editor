/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/home/Hero";
import Waves from "../components/home/Waves";
import AboutSection from "../components/home/About";
import Pricing from "../components/home/Pricing";
import Contact from "../components/home/Contact";

function Home() {
  return (
    <div>
      <Hero />
      <Waves />
      <AboutSection />
      <Pricing />
      <Contact />
    </div>
  );
}

export default Home;
