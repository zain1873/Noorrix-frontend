"use client";
import React from "react";

import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/Hero/Hero";
import FeatureCard from "../components/FeatureCards/FetureCard";
import WhyChooseUs from "../components/WhyChooseUs/WhyChoose";
import ServicesSlider from "../components/ServicesSlider/ServicesSlider";
// import StockSubscribeBanner from "../components/StockSubscribe/StockSubscribe";
import Testimonial from "../components/Testimonials/Testimonials";
import Faqs from "../components/Faqs/Faqs";
import NoorrixFooter from "../components/Footer/Footer";
import BrowseByBudget from "../components/Browsebybudget/Budget";
import WhatsAppButton from "../components/WhatsApp/WhatsAppButton";
import PopularSearches from "../components/PoppularSearched/popularSearched";
function Home() {
  return (
    <>
      <Navbar />
      <HeroBanner/>
      <FeatureCard/>
      <PopularSearches/>
      <ServicesSlider/>
      <WhyChooseUs/>
      <BrowseByBudget/>
      <Testimonial/>
      <Faqs/>
      
      {/* <StockSubscribeBanner/> */}
      <NoorrixFooter/>
    </>
  );
}


export default Home;