// components/Testimonials.tsx
const image = "../../../public/5937550.jpg"
const Testimonials = () => {
    return (
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">What Our Users Are Saying</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">"This app has transformed the way I manage my projects. The rewards system is fantastic!"</p>
              <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center mr-4">
                <span className="font-semibold">JD</span>
              </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">"I love the simplicity of this app. It makes tracking my contributions so easy!"</p>
              <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                <span className="font-semibold">JS</span>
              </div>
                <div>
                  <h3 className="font-semibold">Jane Smith</h3>
                  <p className="text-gray-500">Freelance Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">"This platform has helped me earn more than I expected. Highly recommend!"</p>
              <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4">
                <span className="font-semibold">MJ</span>
              </div>
                <div>
                  <h3 className="font-semibold">Michael Johnson</h3>
                  <p className="text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;