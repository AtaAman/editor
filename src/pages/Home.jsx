/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Estimate from "../components/home/Estimate";
import FAQ from "../components/home/Faq";
import Waves from "../components/home/Waves";

function Home() {
  return (
    <div>
      <Hero />
      <Waves/>
      <About />
      <Estimate/>
      <FAQ/>
    </div>
  );
}

export default Home;
