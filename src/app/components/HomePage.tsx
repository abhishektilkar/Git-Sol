// app/page.tsx

import AppBar from "./AppBar";
import CallToAction from "./CallToAction";
import FAQ from "./FAQ";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Testimonials from "./Testimonials";


const HomePage = () => {

  return (
    <div>
      <AppBar />
        <Hero />
        <Features />
        <CallToAction />
        <Testimonials />
        <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;