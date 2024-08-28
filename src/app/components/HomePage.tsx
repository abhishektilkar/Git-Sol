// app/page.tsx

import { auth } from "@/auth";
import AppBar from "./AppBar";
import CallToAction from "./CallToAction";
import FAQ from "./FAQ";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Testimonials from "./Testimonials";
import UserDashboard from "./UserDashboard";
import { redirect } from "next/navigation";


const HomePage = async () => {

  const session = await auth();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div>
      {/* <AppBar /> */}
      {/* {!user ? 
        (<> */}
          <Hero />
          <Features />
          <CallToAction />
          <Testimonials />
          <FAQ />
        {/* </>) :
        <div className="">
          {user && <p className='text-indigo-500'>sessionToken: {session.sessionToken}</p>}
          <UserDashboard />
        </div> 
      } */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;