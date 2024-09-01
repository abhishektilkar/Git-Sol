// pages/about.tsx
import Link from 'next/link';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      {/* <AppBar /> */}
      <main>
        <section className="py-8 text-center md:py-8">
          <div className="container text-center mx-auto">
            <div className="grid grid-cols-1 text-center md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-lg text-center text-gray-700 mb-6">
                  At Git-Sol, our mission is to create a seamless and rewarding experience for developers while contributing to open-source projects. We empower developers to earn rewards by merging pull requests on GitHub, fostering a vibrant community of contributors.
                </p>
                <a href="#" className="bg-blue-600 text-center hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">Learn More</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Meet Our Team</h2>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="relative bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
                <h3 className="text-xl font-semibold text-gray-900">Abhishek Tilkar</h3>
                <p className="text-gray-500">Founder & Lead Developer</p>
                <p className="text-gray-600 mt-2">
                  Abhishek is a dedicated developer with a passion for open-source projects. With years of experience in software development, he aims to empower developers through innovative solutions.
                </p>
                <a href="mailto:tilkarabhishek2000@gmail.com" className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition duration-300">
                  Contact Abhishek
                </a>
                <Link href="https://github.com/abhishektilkar" passHref>
                  <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577v-2.202c-3.338.726-4.043-1.57-4.043-1.57-.546-1.391-1.332-1.762-1.332-1.762-1.088-.744.083-.73.083-.73 1.205.084 1.838 1.266 1.838 1.266 1.07 1.833 2.807 1.303 3.492.995.108-.773.418-1.303.76-1.603-2.665-.304-5.466-1.337-5.466-5.954 0-1.314.47-2.39 1.238-3.232-.124-.303-.537-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.527 11.527 0 013.003-.403c1.02.005 2.045.138 3.002.403 2.293-1.552 3.301-1.23 3.301-1.23.656 1.652.243 2.873.12 3.176.771.842 1.238 1.918 1.238 3.232 0 4.629-2.806 5.646-5.478 5.944.431.37.813 1.103.813 2.222v3.293c0 .32.218.693.826.574C20.565 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-8 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <svg className="w-12 h-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-600">We are committed to honesty, transparency, and ethical practices in all aspects of our business.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <svg className="w-12 h-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">We continuously strive to innovate and improve our platform, providing the best possible experience for our users.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <svg className="w-12 h-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">We believe in fostering a strong community of developers who support and learn from each other.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default AboutPage;
