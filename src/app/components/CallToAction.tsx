// components/CallToAction.tsx
const CallToAction = () => {
  return (
    <section className="bg-gray-900/35 py-16 md:py-24 text-black text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold">Start Earning Rewards Today!</h2>
        <p className="mt-4 text-lg md:text-xl">
          Join our growing community of developers and start earning Solana for your contributions on GitHub.
        </p>
        <div className="mt-8">
          <button className="px-8 py-3 text-sm md:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Get Started Now</button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;