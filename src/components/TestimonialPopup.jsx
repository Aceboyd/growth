import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const testimonials = [
  { name: 'Lucas', country: 'MEXICO', amount: 33000 },
  { name: 'Amina', country: 'NIGERIA', amount: 12500 },
  { name: 'James', country: 'USA', amount: 47000 },
  { name: 'Chloe', country: 'CANADA', amount: 28000 },
  { name: 'Raj', country: 'INDIA', amount: 35000 },
  { name: 'Zara', country: 'UK', amount: 22000 },
  { name: 'Wei', country: 'CHINA', amount: 39000 },
  { name: 'Ahmed', country: 'EGYPT', amount: 15000 },
  { name: 'Liam', country: 'AUSTRALIA', amount: 27000 },
  { name: 'Sofia', country: 'BRAZIL', amount: 31000 },
];

// Split testimonials into two groups
const rightTestimonials = testimonials.slice(5);

const Popup = ({ position, data, delay = 0 }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % data.length);
        setVisible(true);
      }, 1000); // Increased transition delay
    }, 6000 + delay); // Increased interval with stagger delay

    return () => clearInterval(interval);
  }, [data.length, delay]);

  const { name, country, amount } = data[index];

  return (
    <div 
      className={`
        fixed bottom-6 z-50 transition-opacity duration-1000 
        ${visible ? 'opacity-100' : 'opacity-0'}
        ${position === 'left' ? 'left-4 md:left-6' : 'right-4 md:right-6'}
      `}
    >
      <div className="
        flex items-center gap-3 bg-white text-emerald-400 
        px-4 py-3 md:px-6 md:py-4 rounded-2xl shadow-lg 
        max-w-[90vw] md:max-w-sm
      ">
        <div className="bg-emerald-400 text-black rounded-full p-2 md:p-3">
          <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div className="text-xs md:text-sm font-semibold">
          {name} from <span className="uppercase">{country}</span><br />
          has just earned <br />
          <span className="text-base md:text-lg font-bold">${amount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const TestimonialPopup = () => {
  return (
    <>
      <Popup position="right" data={rightTestimonials} delay={500} />
    </>
  );
};

export default TestimonialPopup;