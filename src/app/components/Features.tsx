// components/Features.tsx
const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 6v-6m-9 9h18a2 2 0 002-2v-2a2 2 0 00-2-2H3a2 2 0 00-2 2v2a2 2 0 002 2z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">Robust Security</h2>
          <p className="mt-2 text-gray-600">Your data is safeguarded with state-of-the-art security protocols, giving you peace of mind.</p>
        </div>
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M4 7h16M5 11h14M6 15h12M7 19h10" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">User-Friendly Interface</h2>
          <p className="mt-2 text-gray-600">Navigate effortlessly with our intuitive design, ensuring a smooth experience for all users.</p>
        </div>
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-7-3a4 4 0 1111-4m-1.2 4.8a4.2 4.2 0 10-6 0" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold">Convenient Access</h2>
          <p className="mt-2 text-gray-600">Manage your rewards from anywhere, at any time, with our responsive platform.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;