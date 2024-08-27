// components/Hero.tsx
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

const Hero = async () => {

  const session = await auth();
  const user = session?.user;
  // console.log(JSON.stringify(user))

  return (
    <section className="bg-gray-200 text-gray-900 py-16 md:py-24">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Unlock Rewards by Merging Pull Requests
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">
          Seamlessly merge your pull requests on GitHub and earn rewards in Solana cryptocurrency. Join our community of developers and start benefiting today!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button className="px-6 py-3 text-sm md:text-base bg-blue-600 text-white border-r-4 hover:bg-blue-700 transition duration-300">Get Started</Button>
          <Button className="px-6 py-3 text-sm md:text-base border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;