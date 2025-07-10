import React from 'react';

const AboutUs = () => {
  return (
    <section id="about-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-emerald-500 font-semibold text-lg">About Us</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Who We Are
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          At Growthsphere Investment, we are dedicated to empowering wealth creation through innovative, automated trading solutions. Our mission is to make cryptocurrency trading accessible, secure, and profitable for everyone, from beginners to seasoned investors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To democratize wealth creation by providing cutting-edge tools and strategies that simplify cryptocurrency trading while maximizing returns.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading platform for automated trading, trusted globally for reliability, innovation, and user-centric design.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, and inclusivity drive everything we do. We prioritize transparency, security, and empowering our users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;