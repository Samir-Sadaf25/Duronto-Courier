import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../How It Works/HowItWorks";
import OurServices from "../Our Services/OurServices";
import CompanyMarquee from "../Company Marquee/CompanyMarquee";
import WhyChooseUs from "../Why Choose Us/WhyChooseUs";
import BecomeMerchant from "../Become a Merchant/BecomeMerchant";

const Home = () => {
  return (
    <div>
      <section className="w-11/12 mx-auto mt-[60px]">
        <Banner></Banner>
      </section>
      <HowItWorks></HowItWorks>
      <section className="w-11/12 mx-auto mb-[100px]">
        <OurServices></OurServices>
      </section>
      <CompanyMarquee></CompanyMarquee>
      <WhyChooseUs></WhyChooseUs>
      <BecomeMerchant></BecomeMerchant>
    </div>
  );
};

export default Home;
