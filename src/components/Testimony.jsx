import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Growthsphere's platform made crypto trading seamless and secure for me!",
    author: "Sarah Johnson",
    role: "Investor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "The returns I've seen with Growthsphere are unmatched. Highly recommend!",
    author: "Michael Chen",
    role: "Trader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "Their customer support is top-notch, always there when I need them.",
    author: "Emily Davis",
    role: "Client",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "Growthsphere's interface is intuitive, even for a crypto beginner like me.",
    author: "James Patel",
    role: "New Investor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "I trust Growthsphere with my investments; their security is unparalleled.",
    author: "Laura Kim",
    role: "Portfolio Manager",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "The staking options on Growthsphere have boosted my earnings significantly.",
    author: "David Lee",
    role: "Crypto Enthusiast",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "Growthsphere's market insights helped me make informed trading decisions.",
    author: "Rachel Wong",
    role: "Analyst",
    image: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "Fast transactions and low fees make Growthsphere my go-to platform.",
    author: "Thomas Brown",
    role: "Day Trader",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "Growthsphere's educational resources empowered me to understand crypto better.",
    author: "Aisha Khan",
    role: "Student",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    quote: "The community at Growthsphere is amazing, always sharing valuable tips!",
    author: "Carlos Rivera",
    role: "Community Member",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
];

const Testimony = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + testimonialsPerPage) % testimonials.length
      );
    }, 5000); // Change set of testimonials every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const displayedTestimonials = testimonials.slice(
    currentIndex,
    Math.min(currentIndex + testimonialsPerPage, testimonials.length)
  );

  // If less than 3 testimonials in the last set, loop back to the start
  if (displayedTestimonials.length < testimonialsPerPage) {
    displayedTestimonials.push(
      ...testimonials.slice(0, testimonialsPerPage - displayedTestimonials.length)
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Users Say About Growthsphere</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md transition-opacity duration-500"
          >
            <img
              src={testimonial.image}
              alt={`${testimonial.author}'s avatar`}
              className="w-16 h-16 rounded-full object-cover mb-4 mx-auto"
            />
            <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center justify-center">
              <div>
                <p className="text-base font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role} at Growthsphere</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimony;